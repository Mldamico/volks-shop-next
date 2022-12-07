import React from "react";
import { useProducts } from "../../hooks/useProducts";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products/ProductList";

const KidPage = () => {
  const { products, isError, isLoading } = useProducts("/products?gender=kid");
  if (isError) return <div>Failed To load</div>;

  return (
    <ShopLayout
      title="Volks Shop - Home"
      pageDescription="Find the best products from Volks"
    >
      <h1 className="text-4xl">Volks Shop</h1>
      <h2 className="mb-1 text-2xl">All Products</h2>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
