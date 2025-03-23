"use client";
import React, { useEffect, useState, useTransition } from "react";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { currentConfig } from "@/config";
import { isEmpty } from "lodash";
import { CompanyCard } from "@/components/CompanyCard";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

export default function SearchPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { getSearchKey } = useSearchParamsState();

  const [companies, setCompanies] = useState<Company[]>([]);

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);
  const onGoToCompany = (nameId: string) =>
    onNavigateGoTo(`/companies/${nameId}`);

  const fetchCompanies = () => {
    const searchKey = getSearchKey();

    console.log("searchKey: ", searchKey);

    startTransition(async () => {
      try {
        const p0 = axios.get<Company[]>(
          `${currentConfig.apiUrl}/companies/filters`,
          {
            params: {
              active: true,
              isHighlighted: true,
              limit: 24,
            },
          },
        );

        const p1 = axios.get<Company[]>(
          `${currentConfig.apiUrl}/companies/filters`,
          {
            params: {
              active: true,
              isHighlighted: false,
              limit: 24,
            },
          },
        );

        const [highlightedCompanies, companies] = await Promise.all([p0, p1]);

        setCompanies([...highlightedCompanies.data, ...companies.data]);
      } catch (err) {
        console.log("ErrorFetchAdvertisements: ", err);
      }
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="w-full px-5 py-7">
      <WrapperComponent>
        <div className="content">
          <div className="tabs flex gap-[1em] border-b-[2px] mb-[1em] border-tertiary">
            <div className="tab flex items-center gap-[1em] py-[.5em] px-[1.2em] text-primary text-[16px] font-bold border-b-[2px] border-primary cursor-pointer">
              <span>
                <strong>{companies.length}</strong> Resultados
              </span>
            </div>
          </div>
          <div className="content w-full">
            <div className="content-items">
              {isPending ? (
                <div className="w-full min-h-[70svh] grid place-items-center">
                  <div>
                    <Loader2 className="animate-spin size-20 text-secondary mb-2" />
                    <span className="text-primary">Cargando...</span>
                  </div>
                </div>
              ) : isEmpty(companies) ? (
                "No se encontraron resultados..."
              ) : (
                <div className="search__cards-wrapper w-full h-auto grid gap-[1em]">
                  {companies.map((company, index) => (
                    <CompanyCard
                      key={index}
                      company={company}
                      onGoToCompany={onGoToCompany}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
}
