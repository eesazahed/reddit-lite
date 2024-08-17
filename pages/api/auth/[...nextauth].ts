import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import { customAlphabet } from "nanoid";
import getUserByUsername from "../../../utils/getUserByUsername";

export default NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      return token;
    },
    session: async ({ session }) => {
      if (session && session.user) {
        const currentUser = await prisma.user.findUnique({
          where: { email: String(session.user.email) },
        });

        if (currentUser) {
          const userId = currentUser.id;

          const findProfile = await prisma.profile.findUnique({
            where: { userId },
          });

          if (!findProfile) {
            const nanoid = customAlphabet(
              "1234567890abcdefghijklmnopqrstuvwxyz",
              16
            );

            const generateId = () => nanoid();

            const findAvailableUsername = async (): Promise<string> => {
              let testId = generateId();
              while (!!(await getUserByUsername(testId))) {
                testId = generateId();
              }
              return testId;
            };

            const randomlyGeneratedUsername = await findAvailableUsername();

            await prisma.profile.create({
              data: { userId, username: randomlyGeneratedUsername },
            });
          }
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
