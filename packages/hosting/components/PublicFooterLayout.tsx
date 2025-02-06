import React from "react";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { ChevronDown } from "lucide-react";

export const PublicFooterLayout = () => {
  return (
    <div className="w-full h-full flex items-center bg-primary py-[2em]">
      <WrapperComponent>
        <div className="footer text-white flex justify-between flex-wrap gap-[3em] px-[1em]">
          <div className="item">
            <h3 className="font-bold mb-3">Usa Tu Plan Hoy</h3>
            <ul className="list-none text-white">
              <li>Crear anuncio</li>
              <li>Categorías</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="item">
            <h3 className="font-bold mb-3">Consigue una discoteca</h3>
            <ul className="list-none text-white">
              <li>Categorías</li>
              <li>Búsqueda</li>
              <li>Novedades</li>
            </ul>
          </div>
          <div className="item">
            <h3 className="font-bold mb-3">Conecta con nosotros</h3>
            <ul className="list-none text-white">
              <li>Contactar soporte</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
          <div className="item flex gap-2">
            <h3 className="font-bold mb-3">Cambiar ciudad</h3>{" "}
            <ChevronDown size={20} />
          </div>
        </div>
        <div className="bottom-footer text-white mt-[2.5em] px-[1em]">
          <span>© 2025 Tu Plan Hoy</span>
        </div>
      </WrapperComponent>
    </div>
  );
};
