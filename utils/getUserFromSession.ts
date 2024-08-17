import { getToken } from "next-auth/jwt";

import prisma from "../lib/prisma";

const getUserFromSession = async (req: any) => {
  try {
    const token = await getToken({ req });

    if (token) {
      const id = Number(token?.sub);
      const user = await prisma.profile.findUnique({
        where: { userId: id },
      });

      return user;
    }

    return null;
  } catch {
    return null;
  }
};

export default getUserFromSession;
