import React from "react";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart/OrderSummary";
import Link from "next/link";

const SummaryPage = () => {
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
              <h2>Summary (3 Products)</h2>
              <hr className="my-1" />
              <div className="flex justify-end">
                <Link href={"/checkout/address"} className="underline">
                  Edit
                </Link>
              </div>
              <h4 className="text-lg font-bold">Address:</h4>
              <p>Matias</p>
              <p>Conchabamba 6498</p>
              <p>Buenos Aires</p>
              <p>Argentina</p>
              <p>4755-9999</p>
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
