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

    const postToCommentId = data.postId;

    const post = await prisma.post.findUnique({
      where: { id: postToCommentId },
    });

    if (!post) {
      return res
        .status(400)
        .json({ content: "Post does not exist.", type: "server" });
    }

    if (!user.topicsJoined.includes(post.topicId)) {
      return res.status(400).json({
        content: "Join the topic first before commenting.",
        type: "server",
      });
    }

    if (data.content.length < 10 || data.content.length > 500) {
      return res.status(400).json({
        content: "Please write between 10-500 characters.",
        type: "content",
      });
    }

    try {
      const time = String(Date.now());

      const newComment = await prisma.comment.create({
        data: {
          createdAt: time,
          topicId: post.topicId,
          postId: post.id,
          creatorUserId: userId,
          content: data.content,
        },
      });

      await prisma.post.update({
        where: { id: post.id },
        data: { commentCount: { increment: 1 } },
      });

      return res.status(200).json({
        content: "Posted!",
        type: "success",
        newCommentId: newComment.id,
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
