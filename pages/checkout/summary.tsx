import React from "react";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart/OrderSummary";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { capitalize } from "../../utils";
import { countries } from "../../utils/countries";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);
  if (!shippingAddress) {
    return <></>;
  }
  return (
    <ShopLayout title="Summary" pageDescription="Order Summary">
      <h1 className="text-3xl md:text-5xl">Order Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <CartList />
        </div>
        <div className="summary-card">
          <div className="flex flex-col justify-between h-full p-4">
            <div>
              <h2>Summary ({numberOfItems} Products)</h2>
              <hr className="my-1" />
              <div className="flex justify-end">
                <Link href={"/checkout/address"} className="underline">
                  Edit
                </Link>
              </div>
              <h4 className="text-lg font-bold">Address:</h4>
              <p>
                {capitalize(shippingAddress?.firstName)} -{" "}
                {capitalize(shippingAddress?.lastName)}
              </p>
              <p>
                {capitalize(shippingAddress?.address)} -{" "}
                {capitalize(shippingAddress?.address2 || "")}
              </p>
              <p>
                {shippingAddress?.city} - {shippingAddress?.zip}
              </p>

              <p>
                {
                  countries.find((c) => c.code === shippingAddress.country)
                    ?.name
                }
              </p>
              <p>{shippingAddress?.phone}</p>
              <hr className="my-2" />
              <div className="flex justify-end">
                <Link href={"/cart"} className="underline">
                  Edit
                </Link>
              </div>
              <OrderSummary />
            </div>
            <div className="mt-3">
              <button className="bg-[#325AD0] w-full py-2 text-white font-bold circular-btn">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default SummaryPage;
