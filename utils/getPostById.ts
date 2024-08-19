import prisma from "../lib/prisma";

const getPostById = async (id: number) => {
  try {
    const post = await prisma.post.findUnique({ where: { id } });

    return post;
  } catch {
    return null;
  }
};

export default getPostById;
