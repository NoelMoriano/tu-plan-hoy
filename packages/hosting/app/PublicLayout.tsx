"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { PublicHeaderLayout } from "@/components/PublicHeaderLayout";
import { PublicFooterLayout } from "@/components/PublicFooterLayout";

interface Props {
  children: React.ReactNode;
}

export const PublicLayout = ({ children }: Props) => {
  const pathname = usePathname();

  const pagesWithoutLayout = !["/login", "/register"].includes(pathname);

  return (
    <div className="w-full h-auto">
      {pagesWithoutLayout && <PublicHeaderLayout />}
      <main className="content min-h-[80svh]">{children}</main>
      {pagesWithoutLayout && <PublicFooterLayout />}
    </div>
  );
};
