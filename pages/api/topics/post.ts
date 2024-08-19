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

    const topicToPostInId = data.topicId;

    const topic = await prisma.topic.findUnique({
      where: { id: topicToPostInId },
    });

    if (!topic) {
      return res
        .status(400)
        .json({ content: "Topic does not exist.", type: "server" });
    }

    if (!user.topicsJoined.includes(topicToPostInId)) {
      return res.status(400).json({
        content: "Join the topic first before posting.",
        type: "server",
      });
    }

    if (data.title.length < 10 || data.title.length > 60) {
      return res.status(400).json({
        content: "Please write between 10-60 characters.",
        type: "title",
      });
    }

    if (data.content.length < 100 || data.content.length > 1000) {
      return res.status(400).json({
        content: "Please write between 100-1000 characters.",
        type: "content",
      });
    }

    try {
      const time = String(Date.now());

      const newPost = await prisma.post.create({
        data: {
          createdAt: time,
          topicId: topicToPostInId,
          creatorUserId: userId,
          title: data.title,
          content: data.content,
        },
      });

      await prisma.topic.update({
        where: { id: topicToPostInId },
        data: { postCount: { increment: 1 } },
      });

      return res.status(200).json({
        content: "Posted!",
        type: "success",
        newPostId: newPost.id,
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
