import { isValidObjectId } from "mongoose";
import { db } from ".";
import Order from "../models/Order";

export const getOrdersById = async (id: string) => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const order = await Order.findById(id);

  await db.disconnect();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
};
