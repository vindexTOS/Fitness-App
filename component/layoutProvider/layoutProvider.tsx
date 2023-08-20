"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  if (pathName === "/login" || pathName === "/signup") {
    return <main>{children}</main>;
  }
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
