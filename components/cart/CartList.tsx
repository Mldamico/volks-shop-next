import { initialData } from "../../database/products";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export const CartList = () => {
  return (
    <>
      {productsInCart.map((product) => (
        <div key={product.slug}>
          <h2>{product.slug}</h2>
        </div>
      ))}
    </>
  );
};
