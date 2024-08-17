import prisma from "../lib/prisma";

const getAllTopics = async () => {
  try {
    const allTopics = await prisma.topic.findMany({});

    return allTopics;
  } catch {
    return null;
  }
};

export default getAllTopics;
