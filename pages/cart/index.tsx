import React from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/";
import { useRouter } from "next/router";
import { FullScreenLoading } from "../../components/ui";

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout title="Cart" pageDescription="Cart Store">
      <h1 className="text-3xl md:text-5xl">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <CartList editable />
        </div>
        <div className="summary-card">
          <div className="flex flex-col justify-between h-full p-4">
            <div>
              <h2>Orden</h2>
              <hr className="my-1" />
              <OrderSummary />
            </div>
            <div className="mt-3">
              <button
                className="bg-[#325AD0] w-full py-2 text-white font-bold circular-btn"
                onClick={() => router.push("/checkout/address")}
              >
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
