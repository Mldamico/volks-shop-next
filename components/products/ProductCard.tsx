import Image from "next/image";
import React, { FC, useMemo } from "react";
import { IProduct } from "../../interfaces";
import { useState } from "react";
import handler from "../../pages/api/hello";
import Link from "next/link";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <Link href={`/product/${product.slug}`} prefetch={false}>
          <div className="relative">
            {product.inStock === 0 && (
              <div className="absolute z-50 px-2 py-1 text-white bg-black top-5 left-5 rounded-2xl">
                <p>No Products in stock</p>
              </div>
            )}

            <Image
              width={450}
              height={400}
              className="fadeIn"
              src={productImage}
              alt={product.title}
            />
          </div>
        </Link>
      </div>
      <div className="mt-1 fadeIn">
        <h3 className="font-bold">{product.title}</h3>
        <p className="font-medium">${product.price}</p>
      </div>
    </div>
  );
};
