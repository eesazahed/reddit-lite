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

    const postToDeleteId = data.postId;

    const post = await prisma.post.findUnique({
      where: { id: postToDeleteId },
    });

    if (!post) {
      return res
        .status(400)
        .json({ content: "Post does not exist.", type: "server" });
    }

    if (post.creatorUserId !== userId) {
      return res.status(400).json({
        content: "This isn't your post.",
        type: "server",
      });
    }

    try {
      await prisma.post.delete({
        where: { id: postToDeleteId },
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
