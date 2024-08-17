import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";
import getUserByUsername from "../../../utils/getUserByUsername";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await getUserFromSession(req);

    if (!user) {
      return res.status(401).json({ message: "Invalid auth", type: "auth" });
    }

    if (user.disabled) {
      return res
        .status(401)
        .json({ message: "Your account has been disabled.", type: "auth" });
    }

    const oldUsername = user.username;

    const usernameRegex = /^[A-Za-z0-9_-]*$/;
    const notAllowedUsernames = [
      "user",
      "settings",
      "post",
      "notifications",
      "auth",
      "profile",
      "search",
      "about",
      "privacypolicy",
      "comment",
      "reply",
    ];

    let data = JSON.parse(req.body);

    if (data.username !== oldUsername) {
      if (user.accountActivated) {
        return res.status(400).json({
          message: "You've already changed your username before.",
          type: "username",
        });
      }

      if (data.username.length < 4 || data.username.length > 16) {
        return res.status(400).json({
          message: "Please enter a username between 4-16 characters.",
          type: "username",
        });
      }

      if (!usernameRegex.test(data.username)) {
        return res.status(400).json({
          message:
            "Usernames can only contain letters, numbers, dashes, and underscores.",
          type: "username",
        });
      }

      if (data.username.toLowerCase() !== user.username.toLowerCase()) {
        const userExists = await getUserByUsername(data.username);

        if (
          notAllowedUsernames.includes(data.username.toLowerCase()) ||
          userExists
        ) {
          return res.status(400).json({
            message: `Username "${data.username}" is unavailable.`,
            type: "username",
          });
        }
      }
    }

    try {
      if (!user.accountActivated) {
        if (oldUsername.toLowerCase() !== data.username.toLowerCase()) {
          await prisma.profile.update({
            where: { userId: user.userId },
            data: { accountActivated: true },
          });
        }
      }

      return res.status(200).json({
        message: "Your settings have been successfully updated!",
        type: "success",
      });
    } catch {
      return res.status(400).json({
        message: "Could not save settings for this user.",
        type: "server",
      });
    }
  } else {
    return res
      .status(405)
      .json({ message: "Sorry, that method isn't allowed.", type: "server" });
  }
};

export default handler;
