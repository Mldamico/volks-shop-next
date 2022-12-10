import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import User from "../../../models/User";
import { db } from "../../../database";
import { jwt } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return validateToken(req, res);
    default:
      res.status(400).json({ message: "Bad Request" });
  }
}
async function validateToken(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "No valid token" });
  }
  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: "No valid user" });
  }

  const { email, _id, role, name } = user;
  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      role,
      name,
      email,
    },
  });
}
