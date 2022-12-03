import Image from "next/image";
import Link from "next/link";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export const CartList = () => {
  return (
    <>
      {productsInCart.map((product) => (
        <div key={product.slug} className="grid grid-cols-4 gap-2 my-2">
          <div>
            <Link href={`/slug`}>
              <div>
                <Image
                  className="rounded-xl"
                  height={200}
                  width={200}
                  alt={product.slug}
                  src={`/products/${product.images[0]}`}
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-col col-span-2">
            <h2>{product.title}</h2>
            <h3>
              Size: <span className="font-bold">M</span>
            </h3>
            <ItemCounter />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg">${product.price}</h3>
            <button className="text-[#325AD0]">Remove</button>
          </div>
        </div>
      ))}
    </>
  );
};
