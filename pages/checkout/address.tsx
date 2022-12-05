import React from "react";
import { ShopLayout } from "../../components/layouts";

const AddressPage = () => {
  return (
    <ShopLayout title="Address" pageDescription="Confirm Address">
      <h1 className="text-3xl font-bold">Address</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            placeholder="Surname"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="address2">Address 2</label>
          <input
            id="address2"
            type="text"
            placeholder="Address 2"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="cp">CP</label>
          <input
            id="cp"
            type="text"
            placeholder="CP"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="pais">Pais</label>
          <select
            name="pais"
            id="pais"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          >
            <option value="Argentina">Argentina</option>
            <option value="Brasil">Brasil</option>
            <option value="Mexico">Mexico</option>
            <option value="Espańa">Espańa</option>
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="City"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="tel">Tel. Number</label>
          <input
            id="tel"
            type="text"
            placeholder="Tel. Number"
            className="w-full p-2 bg-gray-200 border-b-2 border-black outline-none"
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <button className="circular-btn bg-[#325AD0] px-10 py-2 text-white">
          Place Order
        </button>
      </div>
    </ShopLayout>
  );
};

export default AddressPage;
