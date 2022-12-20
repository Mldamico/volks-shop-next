import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces/products";
import Product from "../../../models/Product";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "PUT":
      break;
    case "POST":

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();

  await db.disconnect();
}
