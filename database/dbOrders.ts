import { isValidObjectId } from "mongoose";
import { db } from ".";
import Order from "../models/Order";
import { IOrder } from "../interfaces/order";

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

export const getOrdersByUser = async (id: string): Promise<IOrder[]> => {
  if (!isValidObjectId(id)) {
    return [];
  }

  await db.connect();
  const order = await Order.find({ user: id }).lean();

  await db.disconnect();
  return JSON.parse(JSON.stringify(order));
};
