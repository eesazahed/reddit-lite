import prisma from "../lib/prisma";

const getPostComments = async (postId: number) => {
  try {
    const comments = await prisma.comment.findMany({ where: { postId } });

    return comments;
  } catch {
    return null;
  }
};

export default getPostComments;
