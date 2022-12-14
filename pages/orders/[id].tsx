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
import { volksApi } from "../../api";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";

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
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
  const { shippingAddress } = order;

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("Error");
    }
    setIsPaying(true);

    try {
      const { data } = await volksApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert("Error");
    }
  };
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
              <div className={isPaying ? "flex justify-center" : "none"}>
                <TailSpin
                  height={40}
                  width={40}
                  color="#000"
                  ariaLabel="Paypal Loader"
                  radius="1"
                  visible={isPaying}
                />
              </div>
              <div
                className={!isPaying ? "flex justify-center flex-col" : "none"}
              >
                {order.isPaid ? (
                  <div className="flex items-center justify-center px-4 my-2 space-x-4 text-green-500 border-2 border-green-500 rounded-2xl w-fit">
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
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                          // console.log(details);
                          // const name = details.payer.name!.given_name;
                        });
                      }}
                    />
                  </div>
                )}
              </div>
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
