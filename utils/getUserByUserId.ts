import prisma from "../lib/prisma";

const getUserByUserId = async (userId: number) => {
  try {
    const user = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
};

export default getUserByUserId;
