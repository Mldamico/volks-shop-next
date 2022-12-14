import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { currency } from "../../utils";

export const OrderSummary = () => {
  const { numberOfItems, subtotal, tax, total } = useContext(CartContext);
  return (
    <div className="flex-col">
      <div className="flex justify-between">
        <p>Quantity</p>
        <p>
          {numberOfItems} {numberOfItems > 1 ? "Products:" : "Product"}
        </p>
      </div>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{currency.format(subtotal)}</p>
      </div>
      <div className="flex justify-between">
        <p>Taxs ({+process.env.NEXT_PUBLIC_TAX_RATE! * 100})</p>
        <p>{currency.format(tax)}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>{currency.format(total)}</p>
      </div>
    </div>
  );
};
