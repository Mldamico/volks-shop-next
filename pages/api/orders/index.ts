import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { IOrder } from "../../../interfaces/order";
import { Order } from "../../../models";
import Product from "../../../models/Product";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      createOrder(req, res);
      break;
    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { orderItems, total } = req.body as IOrder;
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Should be authenticate first" });
  }

  const productsIds = orderItems.map((product) => product._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subtotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )!.price;
      if (!currentPrice) {
        throw new Error("Please check cart.");
      }
      return current.quantity * currentPrice + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0;
    const backendTotal = subtotal * (taxRate + 1);
    if (total !== backendTotal) {
      throw new Error("Total values are wrong");
    }

    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

    await newOrder.save();
    // await db.disconnect();
    return res.status(201).json(newOrder);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({ message: "Error in order. Please check logs" });
  }
}
