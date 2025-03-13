"use client";
import React, { useEffect, useState, useTransition } from "react";
import axios, { AxiosResponse } from "axios";
import { currentConfig } from "@/config";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { Star } from "lucide-react";
import { AdvertisementSkeleton } from "@/components/AdvertisementSkeleton";
import { isEmpty } from "lodash";
import { HighlightedCompanyCard } from "@/components/HighlightedCompanyCard";
import { useRouter } from "next/navigation";

export const HighlightedCompanies = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [companiesHighlighted, setCompaniesHighlighted] = useState<Company[]>(
    [],
  );

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);
  const onGoToCompany = (nameId: string) =>
    onNavigateGoTo(`/companies/${nameId}`);

  const fetchCompanies = () => {
    startTransition(async () => {
      try {
        const _companiesHighlighted: AxiosResponse<Company[]> = await axios.get<
          Company[]
        >(`${currentConfig.apiUrl}/companies/filters`, {
          params: {
            active: true,
            isHighlighted: true,
            limit: 16,
          },
        });

        setCompaniesHighlighted(_companiesHighlighted.data);
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
            <Star size={30} />{" "}
            <h2 className="text-[32px] font-bold ">Discos destacados</h2>
          </div>
          <div className="cards-wrapper flex flex-wrap justify-center gap-5">
            {isPending ? (
              <div className="w-full flex justify-center flex-wrap gap-[1em]">
                <AdvertisementSkeleton />
                <AdvertisementSkeleton />
                <AdvertisementSkeleton />
              </div>
            ) : isEmpty(companiesHighlighted) ? (
              <p className="text-[1.2em]">No se encontraron resultados...</p>
            ) : (
              companiesHighlighted.map((company, index) => (
                <HighlightedCompanyCard
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
