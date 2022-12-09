import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";

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
      return registerUser(req, res);
    default:
      res.status(400).json({ message: "Bad Request" });
  }
}
async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = "", password = "", name = "" } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should have at least 6 letters" });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name should have 2 letters at least" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "Email provided is not valid" });
  }

  await db.connect();

  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    if (process.env.NODE_ENV === "development") {
      return res
        .status(401)
        .json({ message: "Invalid Credentials || EMAIL IN USE" });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    name,
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }

  const { _id } = newUser;

  const token = jwt.signToken(_id, email);
  return res.status(200).json({
    token,
    user: {
      role: "client",
      name,
      email,
    },
  });
}
