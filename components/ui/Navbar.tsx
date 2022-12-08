import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { UIContext } from "../../context/ui";
import { useState } from "react";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UIContext);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
  };
  return (
    <div>
      <div className="flex justify-between px-8 py-6 md:px-20">
        <div className="">
          <Link href="/" passHref className="flex items-center">
            <span className="text-xl font-semibold">Volks </span>
            <span className="ml-1 text-md">| Shop</span>
          </Link>
        </div>
        <div
          className={
            isSearchVisible
              ? "hidden"
              : "fadeIn items-center hidden space-x-4 md:inline-flex"
          }
        >
          <Link
            className={`${
              router.pathname === "/category/men"
                ? "bg-black text-white rounded-2xl px-2 py-1"
                : "border-black hover:border-b"
            }`}
            href="/category/men"
          >
            Mens
          </Link>
          <Link
            className={`${
              router.pathname === "/category/women"
                ? "bg-black text-white rounded-2xl px-2 py-1"
                : "border-black hover:border-b"
            }`}
            href="/category/women"
          >
            Womens
          </Link>
          <Link
            className={`${
              router.pathname === "/category/kid"
                ? "bg-black text-white rounded-2xl px-2 py-1"
                : "border-black hover:border-b"
            }`}
            href="/category/kid"
          >
            Kids
          </Link>
        </div>

        <div className="flex items-center space-x-2 text-md ">
          {isSearchVisible ? (
            <div className="hidden md:inline-flex fadeIn">
              <input
                type="text"
                placeholder="Search..."
                onKeyDown={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
                className="border-black outline-none focus:border-b"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AiOutlineCloseCircle
                size={24}
                onClick={() => setIsSearchVisible(false)}
              />
            </div>
          ) : (
            <AiOutlineSearch
              size={24}
              className="fadeIn"
              onClick={() => setIsSearchVisible(true)}
            />
          )}

          <AiOutlineSearch
            size={24}
            className="md:hidden"
            onClick={toggleSideMenu}
          />
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
