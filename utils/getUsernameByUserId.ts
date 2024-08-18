import prisma from "../lib/prisma";

const getUsernameByUserId = async (userId: number) => {
  try {
    const user = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return null;
    }

    return user.username;
  } catch {
    return null;
  }
};

export default getUsernameByUserId;
