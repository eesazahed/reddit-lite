import prisma from "../lib/prisma";
import getUserByUsername from "./getUserByUsername";

const getUserTopicsJoined = async (username: string) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return null;
    }

    const userTopicsJoinedIds = user.topicsJoined;

    console.log(userTopicsJoinedIds);

    return null;
  } catch {
    return null;
  }
};

export default getUserTopicsJoined;
