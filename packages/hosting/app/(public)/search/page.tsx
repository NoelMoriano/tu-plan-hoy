import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { SearchIcon, WatchIcon } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="w-full px-5 py-7">
      <WrapperComponent>
        <div className="content">
          <div className="tabs flex gap-[1em] border-b-[2px] mb-[1em] border-tertiary">
            <div className="tab flex items-center gap-[1em] py-[.5em] px-[1.2em] text-primary text-[16px] font-bold border-b-[2px] border-primary cursor-pointer">
              <SearchIcon /> <span>Resultados</span>
            </div>
            <div className="tab flex items-center gap-[1em] py-[.5em] px-[1.2em] text-tertiary text-[16px] font-bold cursor-pointer">
              <WatchIcon />
              <span>Historial</span>
            </div>
          </div>
          <div className="content w-full grid grid-cols-1 lg:grid-cols-[1fr,30em] gap-[3em]">
            <div className="left-items">
              {[1, 2, 3].map((ads, index) => (
                <div
                  key={index}
                  className="bg-quaternary grid grid-cols-[auto,1fr] gap-5 rounded-[10px] p-5 mb-5"
                >
                  <div className="fle justify-center items-start">
                    <Image
                      src="/images/ads-banner.png"
                      alt="logo empresa"
                      width={210}
                      height={132}
                      className="object-cover rounded-[5px] md:w-[210px] w-[130px] md:h-[132px] h-[82px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="w-full flex gap-2 flex-wrap items-center">
                      <span className="text-primary font-bold text-[24px] leading-[.8em]">
                        Inka Team
                      </span>
                      <div className="tags flex gap-2">
                        <div className="tag w-auto h-[27px] rounded-[5px] text-secondary text-[14px] font-semibold grid place-items-center bg-tertiary px-3">
                          Exclusivas
                        </div>
                        <div className="tag w-auto h-[27px] rounded-[5px] text-secondary text-[14px] font-semibold grid place-items-center bg-tertiary px-3">
                          Música Electrónica
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between flex-wrap gap-2">
                      <div className="hours">
                        <div className="item flex items-center gap-2">
                          <div>
                            <span className="text-secondary font-medium text-[14px]">
                              Inicio:
                            </span>{" "}
                            <span className="text-primary font-semibold text-[15px]">
                              20/Dic/2024
                            </span>
                          </div>
                          <div>
                            <span className="text-secondary font-medium text-[14px]">
                              a las:
                            </span>{" "}
                            <span className="text-primary font-semibold text-[15px]">
                              12:00 AM
                            </span>
                          </div>
                        </div>
                        <div className="item flex items-center gap-2">
                          <div>
                            <span className="text-secondary font-medium text-[14px]">
                              Final:
                            </span>{" "}
                            <span className="text-primary font-semibold text-[15px]">
                              20/Dic/2024
                            </span>
                          </div>
                          <div>
                            <span className="text-secondary font-medium text-[14px]">
                              a las:
                            </span>{" "}
                            <span className="text-primary font-semibold text-[15px]">
                              06:00 AM
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="btns flex items-center gap-2">
                        <Button className="h-[37px] grid place-items-center py-2 px-4">
                          Ver más
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="right-items">
              <div className="categories mb-[2em]">
                <div className="category-title text-[16px] text-primary font-bold mb-[1em]">
                  Categoría
                </div>
                <div className="w-full flex gap-3 flex-wrap">
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Música Electrónica</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Salsa y Música Latina</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Discotecas Temáticas</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Exclusivas</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Con Karaoke</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Música Electrónica</span>
                  </div>
                </div>
              </div>
              <div className="cities">
                <div className="category-title text-[16px] text-primary font-bold mb-[1em]">
                  Cuidad
                </div>
                <div className="w-full flex gap-3 flex-wrap">
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Cusco</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Lima</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Arequipa</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Trujillo</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Piura</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Chiclayo</span>
                  </div>
                  <div className="w-auto h-[37px] bg-quaternary hover:bg-tertiary cursor-pointer px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
                    <span>Huancayo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
}
