import Image from "next/image";
import useSWR from "swr";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { GetServerSideProps, NextPage } from "next";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces/products";

interface Props {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout title="Volks Shop - Search" pageDescription="Search Products">
      <h1 className="text-4xl">Search Products</h1>
      <h2 className="mb-1 text-2xl"></h2>
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

  return {
    props: {
      products,
    },
  };
};
