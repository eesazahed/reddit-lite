import prisma from "../lib/prisma";

const getPostsByTopicId = async (topicId: number) => {
  try {
    const posts = await prisma.post.findMany({ where: { topicId } });

    return posts;
  } catch {
    return null;
  }
};

export default getPostsByTopicId;
