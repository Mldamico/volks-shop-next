import { ShopLayout } from "../components/layouts";

export default function Home() {
  return (
    <ShopLayout
      title="Volks Shop - Home"
      pageDescription="Find the best products from Volks"
    >
      <h1 className="text-4xl">Volks Shop</h1>
      <h2 className="text-2xl mb-1">All Products</h2>
    </ShopLayout>
  );
}
