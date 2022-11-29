import Image from "next/image";
import { ShopLayout } from "../components/layouts";
import { initialData } from "../database/products";

export default function Home() {
  return (
    <ShopLayout
      title="Volks Shop - Home"
      pageDescription="Find the best products from Volks"
    >
      <h1 className="text-4xl">Volks Shop</h1>
      <h2 className="text-2xl mb-1">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {initialData.products.map((product) => (
          <div key={product.slug}>
            <div className="cursor-pointer">
              <Image
                width={450}
                height={400}
                src={`/products/${product.images[0]}`}
                alt={product.title}
              />
            </div>
          </div>
        ))}
      </div>
    </ShopLayout>
  );
}
