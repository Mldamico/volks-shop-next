import React from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";

const CartPage = () => {
  return (
    <ShopLayout title="Cart" pageDescription="Cart Store">
      <h1 className="text-3xl md:text-5xl">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <CartList />
        </div>
        <div className="summary-card">
          <div className="flex flex-col justify-between h-full p-4">
            <div>
              <h2>Orden</h2>
              <hr className="my-1" />
              <OrderSummary />
            </div>
            <div className="mt-3">
              <button className="bg-[#325AD0] w-full py-2 text-white font-bold circular-btn">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default CartPage;
