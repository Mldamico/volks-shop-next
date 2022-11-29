import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoTicketSharp } from "react-icons/io5";
import { BsFillKeyFill } from "react-icons/bs";
import { GiExitDoor } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
export const SideMenu = () => {
  return (
    <div className="flex flex-col my-8 mx-6">
      <div className="flex items-center border-b border-gray-500">
        <input type="text" placeholder="Search..." className="outline-none" />
        <AiOutlineSearch />
      </div>

      <div className="my-10 mx-2 space-y-6 text-lg">
        <div className="flex space-x-8 items-center">
          <CgProfile size={24} />
          <div>Profile</div>
        </div>
        <div className="flex space-x-8 items-center">
          <IoTicketSharp size={24} />
          <div>Orders</div>
        </div>
        <div className="flex space-x-8 items-center">
          <BsFillKeyFill size={24} />
          <div>Login</div>
        </div>
        <div className="flex space-x-8 items-center">
          <GiExitDoor size={24} />
          <div>Sign Out</div>
        </div>
      </div>
      <hr />
      <div className="mt-4">
        <h5>Admin Panel</h5>
        <div className="my-10 mx-2 space-y-6 text-lg">
          <div className="flex space-x-8 items-center">
            <FaProductHunt size={24} />
            <div>Products</div>
          </div>
          <div className="flex space-x-8 items-center">
            <IoTicketSharp size={24} />
            <div>Orders</div>
          </div>
          <div className="flex space-x-8 items-center">
            <FiUsers size={24} />
            <div>USers</div>
          </div>
        </div>
      </div>
    </div>
  );
};
