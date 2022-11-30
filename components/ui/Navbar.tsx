import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { UIContext } from "../../context";
export const Navbar = () => {
  const { toggleSideMenu } = useContext(UIContext);
  return (
    <div>
      <div className="flex justify-between px-8 py-6 md:px-20">
        <div className="">
          <Link href="/" passHref className="flex items-center">
            <span className="text-xl font-semibold">Volks </span>
            <span className="ml-1 text-md">| Shop</span>
          </Link>
        </div>
        <div className="hidden space-x-4 md:inline-flex">
          <Link className="border-black hover:border-b" href="/category/men">
            Mens
          </Link>
          <Link className="border-black hover:border-b" href="/category/women">
            Womens
          </Link>
          <Link className="border-black hover:border-b" href="/category/kid">
            Kids
          </Link>
        </div>

        <div className="flex items-center space-x-2 text-md ">
          <AiOutlineSearch size={24} />
          <Link href="/cart">
            <AiOutlineShoppingCart size={24} />
          </Link>
          <button
            className="px-2 py-1 text-white bg-black rounded-2xl"
            onClick={toggleSideMenu}
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};
