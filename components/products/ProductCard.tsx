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
          <Image
            width={450}
            height={400}
            className="fadeIn"
            src={productImage}
            alt={product.title}
          />
        </Link>
      </div>
      <div className="mt-1 fadeIn">
        <h3 className="font-bold">{product.title}</h3>
        <p className="font-medium">${product.price}</p>
      </div>
    </div>
  );
};
