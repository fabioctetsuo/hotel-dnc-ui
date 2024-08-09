import React from "react";
import Header from "../Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="w-full flex justify-center align-middle">
        {children}
      </main>
      <footer className="w-full flex justify-center py-6 bg-snow-white border-t border-t-light-grey-500">
        © 2024 Nest Away, Inc.
      </footer>
    </>
  );
};

export default Layout;
