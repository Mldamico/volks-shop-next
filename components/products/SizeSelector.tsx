import { FC } from "react";
import { ISize } from "../../interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize: (size: ISize) => void;
}
export const SizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <div className="my-2 space-x-2">
      {sizes.map((size, i) => (
        <button
          key={`${size}-${i}`}
          onClick={() => onSelectedSize(size)}
          className={`px-6 py-2 my-1 rounded-2xl  transition-colors  ${
            selectedSize === size
              ? "bg-black text-white hover:bg-gray-700"
              : "hover:bg-gray-100"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
