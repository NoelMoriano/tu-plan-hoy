import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const MyCompanies = () => {
  return (
    <div className="information-items">
      <div className="header flex justify-between flex-wrap gap-3 mb-5">
        <div>
          <h1 className="text-primary font-bold text-[32px] md:text-[40px] leading-[1em]">
            Mis empresas
          </h1>
        </div>
        <div>
          <Button variant="secondary" className="px-6">
            Agregar empresa
          </Button>
        </div>
      </div>
      <div className="content w-full">
        {[1, 2, 3].map((company, index) => (
          <div
            key={index}
            className="bg-quaternary grid grid-cols-[auto,1fr] md:grid-cols-[10em,1fr] gap-5 md:gap-2 rounded-[10px] p-5 mb-5"
          >
            <div className="grid place-items-center">
              <Image
                src="/images/ads-banner.png"
                alt="logo empresa"
                width={127}
                height={127}
                className="object-cover rounded-full w-[82px] h-[82px] md:w-[127px] md:h-[127px]"
              />
            </div>
            <div className="grid gap-2">
              <div className="text-primary font-bold text-[20px] md:text-[32px] leading-[.8em]">
                Nombre de la empresa
              </div>
              <div className="w-full">
                <div className="text-primary font-semibold text-[15px]">
                  RUC: <span className="font-bold">4567812345123</span>
                </div>
                {/*<div className="text-primary font-semibold text-[15px]">*/}
                {/*  Dirección:{" "}*/}
                {/*  <span className="font-bold">Calle Vargas 179 - Chorrillos</span>*/}
                {/*</div>*/}
                {/*<div className="text-primary font-semibold text-[15px]">*/}
                {/*  Teléfono: <span className="font-bold">97233285</span>*/}
                {/*</div>*/}
                {/*<div className="text-primary font-semibold text-[15px]">*/}
                {/*  Correo: <span className="font-bold">contacto@company1.com</span>*/}
                {/*</div>*/}
              </div>
              <div className="text-primary font-semibold text-[15px]">
                <Button>Editar empresa</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
