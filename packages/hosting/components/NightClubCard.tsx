import React from "react";
import { Button } from "@/components/ui/Button";
import { ImageComponent } from "@/components/ui/Image";

export const NightClubCard = () => {
  return (
    <div className="w-full max-w-[17em] p-3 bg-quaternary rounded-[10px]">
      <div className="img">
        <ImageComponent
          src="/images/img-night-club.jpg"
          className="w-full h-full object-contain rounded-[5px]"
        />
      </div>
      <div className="footer pt-3">
        <div className="title">
          <h3 className="text-primary font-bold text-[20px]">Inka Team</h3>
        </div>
        <div className="price-and-btn flex items-center justify-between">
          <h4>
            Desde <strong>S/20.00</strong>
          </h4>
          <Button
            variant="tertiary"
            className="grid place-items-center h-[30px] py-1 px-3 text-[14px]"
          >
            <span className="m-auto">Ver más</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
