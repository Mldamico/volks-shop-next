import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";
import { useProducts } from "../hooks";

export default function HomePage() {
  const { products, isError, isLoading } = useProducts("/products");

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
}
