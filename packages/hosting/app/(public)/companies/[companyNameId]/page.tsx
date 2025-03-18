"use client";
import React, { useEffect, useState, useTransition } from "react";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import Image from "next/image";
import { RightComponent } from "@/app/(public)/events/[eventType]/[event]/RigthComponent";
import { LeftComponent } from "@/app/(public)/events/[eventType]/[event]/LeftComponent";
import { useParams, useRouter } from "next/navigation";
import { currentConfig } from "@/config";
import axios from "axios";
import assert from "assert";
import { Loader2 } from "lucide-react";

export default function CompanyPage() {
  const router = useRouter();
  const { companyNameId } = useParams<{ companyNameId: string }>();

  const [company, setCompany] = useState<Company | null>(null);

  const [isPending, startTransition] = useTransition();

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);

  const onShowCompany = (nameId: string) =>
    onNavigateGoTo(`/companies/${nameId}`);

  useEffect(() => {
    (async () => {
      await fetchCompany();
    })();
  }, [companyNameId]);

  const fetchCompany = async () => {
    startTransition(async () => {
      try {
        const _company = await axios.get<any>(
          `${currentConfig.apiUrl}/companies/${companyNameId}`,
        );

        if (_company.status !== 200) {
          onNavigateGoTo("/");
          return;
        }

        setCompany(_company.data as Company);
      } catch (err) {
        console.error("ErrorFetchGetCompany: ", err);
        router.back();
      }
    });
  };

  if (isPending || !company)
    return (
      <div className="w-full min-h-[70svh] grid place-items-center">
        <div>
          <Loader2 className="animate-spin size-20 text-secondary mb-2" />
          <span className="text-primary">Cargando...</span>
        </div>
      </div>
    );

  assert(company, "Missing company!");

  return (
    <div className="w-full min-h-[100svh] h-auto relative overflow-hidden bg-white">
      <div className="absolute top-0 w-full h-auto">
        <Image
          src={
            company?.coverImage?.thumbUrl ||
            company?.coverImage?.url ||
            "/images/image-no-found.png"
          }
          width={1233}
          height={758}
          sizes="10"
          alt="Tu plan hoy - logo"
          className="object-contain w-full h-full translate-y-[-7em]"
          style={{
            maskImage: "linear-gradient(#000 70%, transparent)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white from-10% via-white via-40% bg-primary to-100% bg-opacity-60"></div>
      </div>
      <WrapperComponent className="relative z-40">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[733px,1fr] gap-2 pt-[2rem]">
          <LeftComponent company={company} />
          <RightComponent company={company} />
        </div>
        {/*<div className="options-more">*/}
        {/*  <WrapperComponent>*/}
        {/*    <div className="content-wrapper px-4 text-secondary mb-16">*/}
        {/*      <div className="title flex items-center gap-2 mb-5">*/}
        {/*        <h2 className="text-[24px] font-bold ">Sugerencias para tí</h2>*/}
        {/*      </div>*/}
        {/*      <div className="cards-wrapper flex flex-wrap gap-5">*/}
        {/*        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (*/}
        {/*          <CompanyCard key={index} onSeeMore={onSeeMore} />*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </WrapperComponent>*/}
        {/*</div>*/}
      </WrapperComponent>
    </div>
  );
}
