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

  const [results, setResults] = useState<any>([]);

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);
  const onGoToCompany = (nameId: string) =>
    onNavigateGoTo(`/companies/${nameId}`);

  const fetchCompanies = () => {
    const searchKey = getSearchKey();

    startTransition(async () => {
      try {
        const _results = await axios.post<Company[]>(
          `${currentConfig.apiUrl}/search/filters`,
          {
            body: {
              searchKey,
            },
          },
        );

        setResults(_results.data);
      } catch (err) {
        console.log("ErrorFetchAdvertisements: ", err);
      }
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const resultsView = results.map((result: any) => ({
    ...result,
    hits: (result?.hits || []).map((hit: Hit) => ({
      ...hit,
      categories: [],
    })),
  }));

  return (
    <div className="w-full px-5 py-7">
      <WrapperComponent>
        <div className="content">
          <div className="tabs flex gap-[1em] border-b-[2px] mb-[1em] border-tertiary">
            <div className="tab flex items-center gap-[1em] py-[.5em] px-[1.2em] text-primary text-[16px] font-bold border-b-[2px] border-primary cursor-pointer">
              <span>
                <strong>{(resultsView?.[0]?.hits || []).length}</strong>{" "}
                Resultados
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
              ) : isEmpty(resultsView) ? (
                "No se encontraron resultados..."
              ) : (
                <div className="cards-wrapper w-full h-auto grid place-items-center">
                  <div className="cards-wrapper__items w-auto h-auto m-auto flex flex-wrap justify-start gap-5">
                    {(resultsView?.[0]?.hits || []).map(
                      (hit: Hit, index: number) => (
                        <CompanyCard
                          key={index}
                          company={hit}
                          onGoToCompany={onGoToCompany}
                        />
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
}
