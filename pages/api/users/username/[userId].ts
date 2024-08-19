import type { NextApiRequest, NextApiResponse } from "next";
import getUsernameByUserId from "../../../../utils/getUsernameByUserId";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const userId = Number(req.query.userId);

    const username = await getUsernameByUserId(userId);

    if (username) {
      return res.status(200).json({
        content: "Retrieved username.",
        type: "success",
        username: username,
      });
    } else {
      return res.status(400).json({
        content: "Could not retrieve username.",
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
