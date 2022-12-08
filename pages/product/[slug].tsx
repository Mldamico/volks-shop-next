import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { FullScreenLoading, ItemCounter } from "../../components/ui";
import { GetServerSideProps } from "next";
import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces/products";
import { dbProducts } from "../../database";

import { GetStaticPaths } from "next";

import { GetStaticProps } from "next";
interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <ProductSlideshow images={product.images} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-4xl">{product.title}</h1>
          <h2 className="font-bold">${product.price}</h2>
          <div className="my-2">
            <h3 className="font-bold">Amount:</h3>
            <ItemCounter />
            <SizeSelector
              selectedSize={product.sizes[0]}
              sizes={product.sizes}
            />

            <button className="w-full py-2 text-white circular-btn bg-secondary">
              Add To Cart
            </button>

            {/* <button className="w-full py-2 text-red-400 bg-white border-2 border-red-400 rounded-3xl hover:bg-red-400 hover:text-white">
              No Products On Stock
            </button> */}

            <div className="mt-3">
              <h2 className="font-bold">Description:</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default ProductPage;

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlugs = await dbProducts.getAllPRoductsSlugs();

  return {
    paths: productsSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
