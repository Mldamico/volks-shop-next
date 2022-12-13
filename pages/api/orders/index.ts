import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      createOrder(req, res);
    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  return res.status(201).json({ message: "Order created" });
}
