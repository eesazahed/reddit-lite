import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
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

    const data = JSON.parse(req.body);

    const topicToDeleteId = data.topicId;

    const topic = await prisma.topic.findUnique({
      where: { id: topicToDeleteId },
    });

    if (!topic) {
      return res
        .status(400)
        .json({ content: "Topic does not exist.", type: "server" });
    }

    if (topic.creatorUserId !== userId) {
      return res.status(400).json({
        content: "This isn't your topic.",
        type: "server",
      });
    }

    try {
      // Delete all comments

      await prisma.comment.deleteMany({
        where: { topicId: topicToDeleteId },
      });

      // Delete all posts
      await prisma.post.deleteMany({
        where: { topicId: topicToDeleteId },
      });

      // Delete the topic
      await prisma.topic.delete({ where: { id: topicToDeleteId } });

      // Find all the profiles that have joined this topic
      const profiles = await prisma.profile.findMany({
        where: {
          topicsJoined: {
            has: topicToDeleteId,
          },
        },
      });

      // Update their topicsJoined array
      for (const profile of profiles) {
        await prisma.profile.update({
          where: { id: profile.id },
          data: {
            topicsCreated: profile.topicsJoined.filter(
              (topicId) => topicId !== topicToDeleteId
            ),
          },
        });
      }

      // Update the topicsCreated array of the current user
      const updatedTopicsCreated = user.topicsCreated.filter(
        (id) => id !== topicToDeleteId
      );

      await prisma.profile.update({
        where: { userId },
        data: {
          topicsCreated: { set: updatedTopicsCreated },
        },
      });

      return res.status(200).json({
        content: "Deleted.",
        type: "success",
      });
    } catch {
      return res.status(400).json({
        content: "Could not delete.",
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
