import { FC } from "react";
import { ISize } from "../../interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}
export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <div className="my-2 space-x-2">
      {sizes.map((size, i) => (
        <button
          key={`${size}-${i}`}
          className={`px-6 py-2 my-1 rounded-2xl hover:bg-gray-100 transition-colors  ${
            selectedSize === size ? "bg-black text-white hover:bg-gray-700" : ""
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
