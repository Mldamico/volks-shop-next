import Head from "next/head";
import React, { FC } from "react";

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="flex justify-center items-center h-[calc(100vh_-_200px)]">
          {children}
        </div>
      </main>
    </>
  );
};
