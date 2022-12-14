import React, { useEffect } from "react";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart/OrderSummary";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { capitalize } from "../../utils";
import { countries } from "../../utils/countries";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();
    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

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
            <div className="flex flex-col mt-3">
              <button
                onClick={onCreateOrder}
                disabled={isPosting}
                className="bg-[#325AD0] w-full py-2 text-white font-bold circular-btn disabled:bg-gray-300 disabled:text-gray-500"
              >
                Confirm Order
              </button>
              <div
                className={
                  errorMessage
                    ? "flex justify-center py-2 my-2 bg-red-500 text-white rounded-3xl"
                    : "none"
                }
              >
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default SummaryPage;
