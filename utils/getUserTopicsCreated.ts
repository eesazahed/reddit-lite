import prisma from "../lib/prisma";
import getUserByUsername from "./getUserByUsername";

const getUserTopicsCreated = async (username: string) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return null;
    }

    const userId = user.userId;

    const topicsCreated = await prisma.topic.findMany({
      where: { creatorUserId: userId },
    });

    if (topicsCreated.length === 0) {
      return null;
    }

    return topicsCreated;
  } catch {
    return null;
  }
};

export default getUserTopicsCreated;
