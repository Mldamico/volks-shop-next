import Link from "next/link";
import React, { useContext } from "react";

import { UIContext } from "../../context/ui";

export const AdminNavbar = () => {
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

        <button
          className="px-2 py-1 text-white bg-black rounded-2xl"
          onClick={toggleSideMenu}
        >
          Menu
        </button>
      </div>
    </div>
  );
};
