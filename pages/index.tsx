import Image from "next/image";
import useSWR from "swr";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";

export default function HomePage() {
  const { products, isError, isLoading } = useProducts("/products");
  if (isError) return <div>Failed To load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <ShopLayout
      title="Volks Shop - Home"
      pageDescription="Find the best products from Volks"
    >
      <h1 className="text-4xl">Volks Shop</h1>
      <h2 className="mb-1 text-2xl">All Products</h2>
      {isLoading ? <h1>Loading</h1> : <ProductList products={products} />}
    </ShopLayout>
  );
}
