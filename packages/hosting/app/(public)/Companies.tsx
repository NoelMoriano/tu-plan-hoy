"use client";
import React, { useEffect, useState, useTransition } from "react";
import axios, { AxiosResponse } from "axios";
import { currentConfig } from "@/config";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { AdvertisementSkeleton } from "@/components/AdvertisementSkeleton";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { CompanyCard } from "@/components/CompanyCard";

export const MoreCompanies = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [companies, setCompanies] = useState<Company[]>([]);

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);
  const onGoToCompany = (nameId: string) =>
    onNavigateGoTo(`/companies/${nameId}`);

  const fetchCompanies = () => {
    startTransition(async () => {
      try {
        const _companies: AxiosResponse<Company[]> = await axios.get<Company[]>(
          `${currentConfig.apiUrl}/companies/filters`,
          {
            params: {
              active: true,
              isHighlighted: false,
              limit: 24,
            },
          },
        );

        setCompanies(_companies.data);
      } catch (err) {
        console.log("ErrorFetchAdvertisements: ", err);
      }
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="featured-sites">
      <WrapperComponent>
        <div className="content-wrapper px-3 py-11 text-secondary">
          <div className="title flex items-center gap-2 mb-5">
            <h2 className="text-[24px] font-bold ">Más opciones</h2>
          </div>
          <div className="cards-wrapper flex flex-wrap justify-center gap-5">
            {isPending ? (
              <div className="w-full flex justify-center flex-wrap gap-[1em]">
                <AdvertisementSkeleton />
                <AdvertisementSkeleton />
                <AdvertisementSkeleton />
              </div>
            ) : isEmpty(companies) ? (
              <p className="text-[1.2em]">No se encontraron resultados...</p>
            ) : (
              companies.map((company, index) => (
                <CompanyCard
                  key={index}
                  company={company}
                  onGoToCompany={onGoToCompany}
                />
              ))
            )}
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
};
