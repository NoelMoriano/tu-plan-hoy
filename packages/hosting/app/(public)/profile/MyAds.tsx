import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const MyAds = () => {
  return (
    <div className="information-items">
      <div className="header flex justify-between flex-wrap gap-2 mb-5">
        <div>
          <h1 className="text-primary font-bold text-[40px]">Mis anuncios</h1>
        </div>
        <div>
          <Button variant="secondary" className="px-6">
            Agregar anuncio
          </Button>
        </div>
      </div>
      <div className="content w-full">
        {[1, 2, 3].map((company, index) => (
          <div
            key={index}
            className="bg-quaternary grid grid-cols-[auto,1fr] gap-5 rounded-[10px] p-5 mb-5"
          >
            <div className="grid place-items-center">
              <Image
                src="/images/ads-banner.png"
                alt="logo empresa"
                width={210}
                height={132}
                className="object-cover rounded-[5px] w-[210px] h-[132px]"
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
                <div className="status flex items-center">
                  <div className="tag w-auto h-[27px] rounded-[5px] text-green-900 text-[14px] font-semibold grid place-items-center bg-green-200 px-3">
                    Activo
                  </div>
                </div>
                <div className="btns flex items-center gap-2">
                  <Button
                    variant="tertiary"
                    className="h-[37px] grid place-items-center py-2 px-4"
                  >
                    Ver anuncio
                  </Button>
                  <Button className="h-[37px] grid place-items-center py-2 px-4">
                    Editar anuncio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
