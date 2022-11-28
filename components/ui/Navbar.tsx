import Link from "next/link";
import React from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
export const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between py-6 px-20">
        <div className="">
          <Link href="/" passHref className="flex items-center">
            <span className="font-semibold text-xl">Volks </span>
            <span className="ml-1 text-md">| Shop</span>
          </Link>
        </div>
        <div className="space-x-4 hidden md:inline-flex">
          <Link className="hover:border-b border-black" href="/category/men">
            Mens
          </Link>
          <Link className="hover:border-b border-black" href="/category/women">
            Womens
          </Link>
          <Link className="hover:border-b border-black" href="/category/kid">
            Kids
          </Link>
        </div>

        <div className="flex items-center space-x-2 text-md ">
          <AiOutlineSearch size={24} />
          <Link href="/cart">
            <AiOutlineShoppingCart size={24} />
          </Link>
          <button className="rounded-2xl bg-black text-white px-2 py-1">
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};
