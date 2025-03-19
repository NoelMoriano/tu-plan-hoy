"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Search, XIcon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { currentConfig } from "@/config";
import Link from "next/link";

interface Props {
  placeholder?: string;
  className?: string;
}

export const InputSearch = ({ placeholder, className }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [inputData, setInputData] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<any>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => await fetchCategories())();
  }, []);

  const fetchCategories = async () => {
    try {
      const _results = await axios.get<any[]>(
        `${currentConfig.apiUrl}/categories`,
      );

      setCategories(_results.data);
    } catch (err) {
      console.log("ErrorFetchAdvertisements: ", err);
    }
  };

  useEffect(() => {
    if (inputData.length >= 3) {
      setShowResults(true);
      fetchSearchData();
    } else {
      setShowResults(false);
    }
  }, [inputData]);

  const fetchSearchData = () => {
    startTransition(async () => {
      try {
        const _results = await axios.get<any[]>(
          `${currentConfig.apiUrl}/search?inputData=${inputData}`,
        );

        setResults(_results.data);
      } catch (err) {
        console.log("ErrorFetchAdvertisements: ", err);
      }
    });
  };

  const onResetSearch = () => {
    setShowResults(false);
    setInputData("");
  };

  const resultsView = results.map((result: any) => ({
    ...result,
    hits: (result?.hits || []).map((hit: Hit) => ({
      ...hit,
      categories: categories.filter((category) =>
        hit.categoryIds.includes(category.id),
      ),
    })),
  }));

  const existsHits = resultsView?.[0]?.nbHits > 0;

  return (
    <div
      className={`w-full h-[44px] relative grid grid-cols-[1fr,auto] bg-white rounded-[5px] px-2 ${className && className}`}
    >
      <div className="w-full grid place-items-center outline-0">
        <input
          type="text"
          value={inputData}
          className="w-full h-full p-1 text-secondary placeholder-secondary text-[14px] outline-0"
          placeholder={placeholder}
          onChange={(e) => setInputData(e.target.value)}
        />
      </div>
      <div className="grid place-items-center relative">
        {inputData ? (
          <XIcon
            size={17}
            className="cursor-pointer"
            onClick={() => setInputData("")}
          />
        ) : (
          <Search size={17} className="cursor-pointer" />
        )}
      </div>
      {showResults && (
        <div className="w-full h-[50svh] absolute z-50 top-[3em] left-0 bg-quaternary rounded-[.5em] p-[1em] overflow-auto">
          <ul className="grid gap-2">
            {isPending
              ? "Loading..."
              : !existsHits
                ? "No se encontraron resultados"
                : (resultsView?.[0]?.hits || []).map(
                    (hit: Hit, index: number) => (
                      <Link
                        key={index}
                        href={`/companies/${hit.nameId}`}
                        onClick={() => onResetSearch()}
                      >
                        <li className="grid grid-cols-[5em,1fr] gap-2 hover:bg-tertiary p-2 rounded-[.5em]">
                          <div className="img grid place-items-center">
                            <Image
                              src={
                                hit?.coverImage?.thumbUrl ||
                                hit?.coverImage?.url ||
                                "/images/image-no-found.png"
                              }
                              width={167}
                              height={30}
                              sizes="10"
                              alt="Tu plan hoy - logo"
                              className="w-full h-auto object-contain rounded-[.2em]"
                            />
                          </div>
                          <div className="description grid gap-[.5em]">
                            <div className="name text-[1.2em] font-semibold text-primary flex gap-[.5em]">
                              <Image
                                src={
                                  hit?.logo?.thumbUrl ||
                                  hit?.logo?.url ||
                                  "/images/image-no-found.png"
                                }
                                width={30}
                                height={30}
                                alt="Tu plan hoy - logo"
                                className="w-[1.3em] h-[1.3em] z-20 object-contain rounded-full"
                              />{" "}
                              {hit.name}
                            </div>
                            <div className="categories flex flex-wrap gap-[.7em]">
                              {(hit?.categories || []).map(
                                (category: any, index: number) => (
                                  <span
                                    key={index}
                                    className="bg-tertiary min-w-[5em] pl-2 pr-2 rounded-[3em] text-center text-[.7em] text-secondary capitalize flex items-center"
                                  >
                                    {category.name}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        </li>
                      </Link>
                    ),
                  )}
            {!isPending && (
              <Link href="/search" onClick={() => onResetSearch()}>
                <li className="grid place-items-center gap-2 hover:bg-tertiary p-2 rounded-[.5em]">
                  <div className="img grid place-items-center">
                    <span className="text-[1.2em] text-primary">
                      Ver todos los resultados...
                    </span>
                  </div>
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
