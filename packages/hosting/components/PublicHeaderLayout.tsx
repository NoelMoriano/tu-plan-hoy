import React from "react";

import { InputSearch } from "@/components/ui/InputSearch";
import { ImageComponent } from "@/components/ui/Image";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { MapPin, Tags } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const PublicHeaderLayout = () => {
  return (
    <div className="w-full h-auto bg-quaternary">
      <WrapperComponent>
        <div className="py-3 px-5 grid grid-cols-[auto,auto,auto,auto]">
          <div className="logotipo flex justify-start items-center pr-3">
            <ImageComponent
              src="/images/logotipo.png"
              className="w-[167px] h-[30px] object-contain"
            />
          </div>
          <div className="search grid place-items-center px-3">
            <InputSearch placeholder="Encuentra discos" className="w-[25em]" />
          </div>
          <div className="filters flex items-center justify-center gap-x-5 px-3">
            <div className="category-icon flex flex-col items-center justify-center text-primary gap-[1px] hover:bg-tertiary p-1 px-1.5 rounded-[5px] cursor-pointer">
              <MapPin size={20} />
              <span className="font-bold text-[12px]">Cuidad</span>
            </div>
            <div className="category-icon flex flex-col items-center justify-center text-primary gap-[1px] hover:bg-tertiary p-1 px-1.5 rounded-[5px] cursor-pointer">
              <Tags size={20} />
              <span className="font-bold text-[12px]">Categorías</span>
            </div>
          </div>
          <div className="buttons-and-avatar flex justify-end items-center pl-3 gap-2">
            <Button className="leading-3">Crear anuncio</Button>
            <Button variant="secondary" className="leading-3">
              Iniciar sesión
            </Button>
            <Button variant="secondary" className="leading-3">
              Registrarse
            </Button>
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
};
