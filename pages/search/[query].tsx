import Image from "next/image";
import useSWR from "swr";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { GetServerSideProps, NextPage } from "next";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces/products";

interface Props {
  products: IProduct[];
  foundProduct: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProduct, query }) => {
  return (
    <ShopLayout title="Volks Shop - Search" pageDescription="Search Products">
      <h1 className="text-4xl">Search Products</h1>
      {foundProduct ? (
        <h2 className="mb-1 text-2xl">Search: {query}</h2>
      ) : (
        <h2 className="mb-1 text-2xl">No Products Found - {query}</h2>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};
export default SearchPage;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllPRoducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};
