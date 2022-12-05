import React from "react";

export const OrderSummary = () => {
  return (
    <div className="flex-col">
      <div className="flex justify-between">
        <p>Products:</p>
        <p>3</p>
      </div>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>$155.30</p>
      </div>
      <div className="flex justify-between">
        <p>Tax</p>
        <p>$20.15</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>$175.45</p>
      </div>
    </div>
  );
};
