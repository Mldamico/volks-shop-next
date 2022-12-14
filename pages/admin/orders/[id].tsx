import React from "react";
import { ShopLayout } from "../../../components/layouts/ShopLayout";
import { CartList } from "../../../components/cart/CartList";

import { GetServerSideProps, NextPage } from "next";
import { OrderSummary } from "../../../components/cart/OrderSummary";
import { CiCreditCardOff, CiCreditCard1 } from "react-icons/ci";
import { dbOrders } from "../../../database";
import { IOrder } from "../../../interfaces/order";
import { volksApi } from "../../../api";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

interface Props {
  order: IOrder;
}

export type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <AdminLayout title="Order Summary" subtitle={`Order: ${order._id}`}>
      <h1 className="text-3xl md:text-5xl">Order: {order._id}</h1>
      {order.isPaid ? (
        <div className="flex items-center px-4 my-2 space-x-4 text-green-500 border-2 border-green-500 rounded-2xl w-fit">
          <CiCreditCard1 size={24} />
          <div>
            <h3>Order have been paid</h3>
          </div>
        </div>
      ) : (
        <div className="flex items-center px-4 my-2 space-x-4 text-red-500 border-2 border-red-500 rounded-2xl w-fit">
          <CiCreditCardOff size={24} />
          <div>
            <h3>Pending Order </h3>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <CartList products={order.orderItems} />
        </div>
        <div className="summary-card">
          <div className="flex flex-col justify-between h-full p-4">
            <div>
              <h2>
                Summary ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "Products" : "Product"})
              </h2>
              <hr className="my-1" />

              <h4 className="text-lg font-bold">Address:</h4>
              <p>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p>
                {shippingAddress.address} -{" "}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ""}
              </p>
              <p>
                {shippingAddress.city} - {shippingAddress.zip}
              </p>
              <p>{shippingAddress.country}</p>
              <p>{shippingAddress.phone}</p>
              <hr className="my-2" />

              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subtotal: order.subtotal,
                  total: order.total,
                  tax: order.tax,
                }}
              />
            </div>
            <div className="flex flex-col mt-3">
              <div className={"flex justify-center flex-col"}>
                {order.isPaid ? (
                  <div className="flex items-center justify-center px-4 my-2 space-x-4 text-green-500 border-2 border-green-500 rounded-2xl w-fit">
                    <CiCreditCard1 size={24} />
                    <div>
                      <h3>Order have been paid</h3>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center px-4 my-2 space-x-4 text-red-500 border-2 border-red-500 rounded-2xl w-fit">
                      <CiCreditCardOff size={24} />
                      <div>
                        <h3>Pending Order </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const order = await dbOrders.getOrdersById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};
