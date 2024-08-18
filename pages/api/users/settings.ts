import type { NextApiRequest, NextApiResponse } from "next";
import getUserFromSession from "../../../utils/getUserFromSession";
import prisma from "../../../lib/prisma";
import getUserByUsername from "../../../utils/getUserByUsername";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await getUserFromSession(req);

    if (!user) {
      return res.status(401).json({ content: "Invalid auth", type: "auth" });
    }

    const userId = user.userId;

    if (user.disabled) {
      return res
        .status(401)
        .json({ content: "Your account has been disabled.", type: "auth" });
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

    if (data.username && data.username !== oldUsername) {
      if (user.accountActivated) {
        return res.status(400).json({
          content: "You've already changed your username before.",
          type: "username",
        });
      }

      if (data.username.length < 4 || data.username.length > 16) {
        return res.status(400).json({
          content: "Please enter a username between 4-16 characters.",
          type: "username",
        });
      }

      if (!usernameRegex.test(data.username)) {
        return res.status(400).json({
          content:
            "Usernames can only contain letters, numbers, dashes, and underscores.",
          type: "username",
        });
      }

      const userExists = await getUserByUsername(data.username);

      if (
        notAllowedUsernames.includes(data.username.toLowerCase()) ||
        userExists
      ) {
        return res.status(400).json({
          content: `Username "${data.username}" is unavailable.`,
          type: "username",
        });
      }

      await prisma.profile.update({
        where: { userId },
        data: { username: data.username, accountActivated: true },
      });
    }

    if (data.bio.length > 100) {
      return res.status(400).json({
        content: "Bio must be less than 100 characters.",
        type: "bio",
      });
    }

    try {
      await prisma.profile.update({
        where: { userId },
        data: { bio: data.bio },
      });

      return res.status(200).json({
        content: "Your settings have been successfully updated!",
        type: "success",
      });
    } catch {
      return res.status(400).json({
        content: "Could not save settings for this user.",
        type: "server",
      });
    }
  } else {
    return res
      .status(405)
      .json({ content: "Sorry, that method isn't allowed.", type: "server" });
  }
};

export default handler;
