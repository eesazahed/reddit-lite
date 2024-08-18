import prisma from "../lib/prisma";
import getUserByUsername from "./getUserByUsername";

const getUserTopicsJoined = async (username: string) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return null;
    }

    const userTopicsJoinedIds = user.topicsJoined;

    let topicData: TopicType[] = [];

    for (const topicId of userTopicsJoinedIds) {
      const topicIdData = await prisma.topic.findUnique({
        where: { id: topicId },
      });

      if (topicIdData) {
        topicData.push(topicIdData);
      }
    }

    if (topicData.length === 0) {
      return null;
    }

    return topicData;
  } catch {
    return null;
  }
};

export default getUserTopicsJoined;
