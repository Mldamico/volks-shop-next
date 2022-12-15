import React from "react";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList } from "../../components/cart/CartList";

import { GetServerSideProps, NextPage } from "next";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { CiCreditCardOff, CiCreditCard1 } from "react-icons/ci";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces/order";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;
  return (
    <ShopLayout title="Order Summary" pageDescription="Order">
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
              {order.isPaid ? (
                <div className="flex items-center px-4 my-2 space-x-4 text-green-500 border-2 border-green-500 rounded-2xl w-fit">
                  <CiCreditCard1 size={24} />
                  <div>
                    <h3>Order have been paid</h3>
                  </div>
                </div>
              ) : (
                <div>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "21.99",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        console.log(details);
                        const name = details.payer.name!.given_name;
                        alert(`Transaction completed by ${name}`);
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrdersById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: `orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `orders/history`,
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
