import React, { FC } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
interface Props {
  currentValue: number;
  updatedQuantity: (newValue: number) => void;
  maxValue: number;
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  updatedQuantity,
  maxValue,
}) => {
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;

      return updatedQuantity(currentValue - 1);
    }
    if (currentValue >= maxValue) return;
    updatedQuantity(currentValue + 1);
  };

  return (
    <div className="flex items-center mx-2 my-4">
      <div className="cursor-pointer">
        <IoRemoveCircleOutline size={24} onClick={() => addOrRemove(-1)} />
      </div>
      <p className="w-10 text-center">{currentValue}</p>
      <div className="cursor-pointer">
        <IoAddCircleOutline size={24} onClick={() => addOrRemove(1)} />
      </div>
    </div>
  );
};
