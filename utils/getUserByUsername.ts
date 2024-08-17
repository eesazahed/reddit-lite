import prisma from "../lib/prisma";

const getUserByUsername = async (username: string) => {
  try {
    const users = await prisma.profile.findMany({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    const user = users[0];

    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
};

export default getUserByUsername;
