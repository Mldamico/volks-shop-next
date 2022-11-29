import React from "react";
import { ShopLayout } from "../components/layouts";

const Custom404 = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="Nothing to show">
      <div className="flex flex-col sm:flex-row justify-center items-center h-[calc(100vh_-_200px)]">
        <h1 className=" text-3xl sm:text-5xl font-semibold">404 |</h1>
        <h3 className="ml-4 text-md sm:text-xl">Nothing to show here 🥲</h3>
      </div>
    </ShopLayout>
  );
};

export default Custom404;
