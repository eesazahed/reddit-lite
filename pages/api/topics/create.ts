import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";
import getUserByUsername from "../../../utils/getUserByUsername";

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

    if (data.name.length < 4 || data.name.length > 30) {
      return res.status(400).json({
        content: "Please enter a name between 4-30 characters.",
        type: "name",
      });
    }

    if (data.description.length < 4 || data.description.length > 60) {
      return res.status(400).json({
        content: "Please enter a description between 4-60 characters.",
        type: "description",
      });
    }

    try {
      const time = String(Date.now());

      const newTopic = await prisma.topic.create({
        data: {
          createdAt: time,
          members: 1,
          creatorUserId: userId,
          name: data.name,
          description: data.description,
        },
      });

      const newTopicId = newTopic.id;

      await prisma.profile.update({
        where: { userId },
        data: {
          topicsCreated: { push: newTopicId },
          topicsJoined: { push: newTopicId },
        },
      });

      return res.status(200).json({
        content: "Your new topic has been successfully created!",
        type: "success",
        newTopicId,
      });
    } catch {
      return res.status(400).json({
        content: "Could not create topic.",
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
