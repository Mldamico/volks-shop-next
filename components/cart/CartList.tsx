import Image from "next/image";
import Link from "next/link";
import { FC, useContext } from "react";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context/cart/CartContext";
import { ICartProduct } from "../../interfaces/cart";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantity = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <div
          key={product.slug + product.size}
          className="grid grid-cols-4 gap-2 my-2"
        >
          <div>
            <Link href={`/product/${product.slug}`}>
              <div>
                <Image
                  className="rounded-xl"
                  height={200}
                  width={200}
                  alt={product.slug}
                  src={`/products/${product.image}`}
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-col col-span-2">
            <h2>{product.title}</h2>
            <h3>
              Size: <span className="font-bold">{product.size}</span>
            </h3>
            {editable ? (
              <ItemCounter
                currentValue={product.quantity}
                maxValue={10}
                updatedQuantity={(value) => onNewCartQuantity(product, value)}
              />
            ) : (
              <h4>
                {product.quantity}
                {product.quantity > 1 ? " products" : " product"}
              </h4>
            )}
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg">${product.price}</h3>
            {editable && (
              <button
                onClick={() => removeCartProduct(product)}
                className="text-[#325AD0]"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
