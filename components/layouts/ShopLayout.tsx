import Head from "next/head";
import { FC, useContext, useState } from "react";
import { Navbar, SideMenu } from "../ui";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { UIContext } from "../../context/ui";
interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: JSX.Element | JSX.Element[];
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  const { sidemenuOpen, toggleSideMenu } = useContext(UIContext);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <Drawer
        open={sidemenuOpen}
        onClose={toggleSideMenu}
        direction="right"
        overlayOpacity={0.7}
      >
        <SideMenu />
      </Drawer>
      <main className="my-20 mx-auto max-w-[1440px] py-0 px-8">{children}</main>

      <footer></footer>
    </>
  );
};
