import Image from "next/image";
import useSWR from "swr";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export default function HomePage() {
  const { data, error } = useSWR("/api/products", fetcher);

  if (error) return <div>Failed To load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <ShopLayout
      title="Volks Shop - Home"
      pageDescription="Find the best products from Volks"
    >
      <h1 className="text-4xl">Volks Shop</h1>
      <h2 className="mb-1 text-2xl">All Products</h2>
      <ProductList products={data} />
    </ShopLayout>
  );
}
