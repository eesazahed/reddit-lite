import prisma from "../lib/prisma";

const getTopicById = async (topicId: number) => {
  try {
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
    });

    if (!topic) {
      return null;
    }

    return topic;
  } catch {
    return null;
  }
};

export default getTopicById;
