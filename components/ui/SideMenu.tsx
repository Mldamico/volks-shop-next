import React, { useContext } from "react";
import { AiOutlineSearch, AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoTicketSharp } from "react-icons/io5";
import { BsFillKeyFill } from "react-icons/bs";
import { GiExitDoor } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { TbMoodKid } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
import { UIContext } from "../../context";
import { useState } from "react";
export const SideMenu = () => {
  const router = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="flex flex-col mx-6 my-8">
      <div className="flex items-center border-b border-gray-500">
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
          className="outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AiOutlineSearch onClick={onSearchTerm} />
      </div>

      <div className="mx-2 my-10 space-y-6 text-lg">
        <div className="flex items-center space-x-8">
          <CgProfile size={24} />
          <div>Profile</div>
        </div>
        <div className="flex items-center space-x-8">
          <IoTicketSharp size={24} />
          <div>Orders</div>
        </div>
        <div className="flex items-center space-x-8 cursor-pointer">
          <AiOutlineMan size={24} />
          <p onClick={() => navigate("/category/men")}>Men</p>
        </div>
        <div className="flex items-center space-x-8 cursor-pointer">
          <AiOutlineWoman size={24} />
          <p onClick={() => navigate("/category/women")}>Women</p>
        </div>
        <div className="flex items-center space-x-8 cursor-pointer">
          <TbMoodKid size={24} />
          <p onClick={() => navigate("/category/kid")}>Kid</p>
        </div>
        <div className="flex items-center space-x-8">
          <BsFillKeyFill size={24} />
          <div>Login</div>
        </div>
        <div className="flex items-center space-x-8">
          <GiExitDoor size={24} />
          <div>Sign Out</div>
        </div>
      </div>
      <hr />
      <div className="mt-4">
        <h5>Admin Panel</h5>
        <div className="mx-2 my-10 space-y-6 text-lg">
          <div className="flex items-center space-x-8">
            <FaProductHunt size={24} />
            <div>Products</div>
          </div>
          <div className="flex items-center space-x-8">
            <IoTicketSharp size={24} />
            <div>Orders</div>
          </div>
          <div className="flex items-center space-x-8">
            <FiUsers size={24} />
            <div>USers</div>
          </div>
        </div>
      </div>
    </div>
  );
};
