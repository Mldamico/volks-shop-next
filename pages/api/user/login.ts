import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
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
    case "POST":
      return loginUser(req, res);
    default:
      res.status(400).json({ message: "Bad Request" });
  }
}
async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = "", password = "" } = req.body;

  await db.connect();

  const user = await User.findOne({ email });

  await db.disconnect();

  if (!user) {
    if (process.env.NODE_ENV === "development") {
      return res.status(401).json({ message: "Invalid Credentials || EMAIL" });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  if (!bcrypt.compareSync(password, user.password!)) {
    if (process.env.NODE_ENV === "development") {
      return res
        .status(401)
        .json({ message: "Invalid Credentials || PASSWORD" });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const { role, name, _id } = user;

  const token = jwt.signToken(_id, email);
  return res.status(200).json({
    token,
    user: {
      role,
      name,
      email,
    },
  });
}
