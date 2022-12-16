import Head from "next/head";
import { FC, useContext, useState } from "react";
import { Navbar, SideMenu } from "../ui";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { UIContext } from "../../context/ui";
import { AdminNavbar } from "../admin";
interface Props {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

export const AdminLayout: FC<Props> = ({ children, title, subtitle, icon }) => {
  const { sidemenuOpen, toggleSideMenu } = useContext(UIContext);
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>

      <Drawer
        open={sidemenuOpen}
        onClose={toggleSideMenu}
        direction="right"
        overlayOpacity={0.7}
      >
        <SideMenu />
      </Drawer>
      <main className="my-20 mx-auto max-w-[1440px] py-0 px-8">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            {icon}
            <h1 className="text-4xl"> {title}</h1>
          </div>

          <h2 className="mb-1 text-2xl">{subtitle}</h2>
        </div>
        <div className="fadeIn">{children}</div>
      </main>
    </>
  );
};
