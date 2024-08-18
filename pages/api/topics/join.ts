import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await getUserFromSession(req);

    if (!user) {
      return res.status(401).json({ content: "Invalid auth", type: "auth" });
    }

    const userId = user.userId;

    if (user.disabled) {
      return res
        .status(401)
        .json({ content: "Your account has been disabled.", type: "auth" });
    }

    if (!user.accountActivated) {
      return res.status(401).json({
        content: "Active your account first by choosing a username.",
        type: "auth",
      });
    }

    let data = JSON.parse(req.body);

    const topicToJoinId = data.id;

    const topic = await prisma.topic.findUnique({
      where: { id: topicToJoinId },
    });

    if (!topic) {
      return res
        .status(400)
        .json({ content: "Topic does not exist.", type: "server" });
    }

    if (topic.creatorUserId === userId) {
      return res.status(400).json({
        content: "You cannot leave or join your own topic.",
        type: "server",
      });
    }

    if (user.topicsJoined.includes(topicToJoinId)) {
      return res.status(400).json({
        content: "Already joined.",
        type: "server",
      });
    }

    try {
      await prisma.topic.update({
        where: { id: topicToJoinId },
        data: {
          members: { increment: 1 },
        },
      });

      await prisma.profile.update({
        where: { userId },
        data: {
          topicsJoined: { push: topicToJoinId },
        },
      });

      return res.status(200).json({
        content: "Joined!",
        type: "success",
      });
    } catch {
      return res.status(400).json({
        content: "Could not join topic.",
        type: "server",
      });
    }
  } else {
    return res
      .status(405)
      .json({ content: "Sorry, that method isn't allowed.", type: "server" });
  }
};

export default handler;
