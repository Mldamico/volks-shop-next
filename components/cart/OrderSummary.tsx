import React, { FC } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { currency } from "../../utils";

interface Props {
  orderValues?: {
    numberOfItems: number;
    subtotal: number;
    total: number;
    tax: number;
  };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { numberOfItems, subtotal, tax, total } = useContext(CartContext);

  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subtotal, tax, total };
  return (
    <div className="flex-col">
      <div className="flex justify-between">
        <p>Quantity</p>
        <p>
          {summaryValues.numberOfItems}{" "}
          {summaryValues.numberOfItems > 1 ? "Products:" : "Product"}
        </p>
      </div>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{currency.format(summaryValues.subtotal)}</p>
      </div>
      <div className="flex justify-between">
        <p>Taxs ({+process.env.NEXT_PUBLIC_TAX_RATE! * 100})</p>
        <p>{currency.format(summaryValues.tax)}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>{currency.format(summaryValues.total)}</p>
      </div>
    </div>
  );
};
