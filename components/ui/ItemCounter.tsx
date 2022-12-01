import React, { FC } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
interface Props {}

export const ItemCounter: FC<Props> = () => {
  return (
    <div className="flex items-center mx-2 my-4">
      <div>
        <IoRemoveCircleOutline size={24} />
      </div>
      <p className="w-10 text-center">1</p>
      <div>
        <IoAddCircleOutline size={24} />
      </div>
    </div>
  );
};
