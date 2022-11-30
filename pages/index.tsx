import Image from "next/image";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { initialData } from "../database/products";

export default function Home() {
  return (
    <ShopLayout
      title="Volks Shop - Home"
      pageDescription="Find the best products from Volks"
    >
      <h1 className="text-4xl">Volks Shop</h1>
      <h2 className="mb-1 text-2xl">All Products</h2>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
}
