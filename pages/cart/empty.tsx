import { ShopLayout } from "../../components/layouts/ShopLayout";
import { BsCartX } from "react-icons/bs";
import Link from "next/link";

const EmptyCartPage = () => {
  return (
    <ShopLayout
      title="Empty Cart"
      pageDescription="The cart is currently empty"
    >
      <div className="flex flex-col sm:flex-row justify-center items-center h-[calc(100vh_-_200px)]">
        <BsCartX size={64} />
        <div className="flex flex-col items-center ml-6 space-y-2">
          <h1 className="text-3xl font-semibold sm:text-3xl">
            Your Cart Is Empty
          </h1>
          <Link href="/" className="" passHref>
            <button className="px-6 py-2 text-white bg-black rounded-2xl hover:bg-gray-700">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </ShopLayout>
  );
};

export default EmptyCartPage;
