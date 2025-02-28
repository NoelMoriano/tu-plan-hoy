import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface Props {
  advertisement: Advertisement;
  onSeeMore: () => void;
}

export const FeaturedSitesCard = ({ advertisement, onSeeMore }: Props) => {
  return (
    <div className="w-full max-w-[24em] space-y-1 p-3 bg-quaternary rounded-[10px]">
      <div className="img">
        <Image
          src={
            advertisement?.adImage?.thumbUrl ||
            advertisement?.adImage?.url ||
            "/images/img-no-found.jpg"
          }
          width={420}
          height={420}
          alt={advertisement.name}
          className="w-full h-[13em] object-cover rounded-[5px]"
        />
      </div>
      <div className="footer pt-3 space-y-2">
        <div className="title">
          <h3 className="text-primary font-bold text-[24px] leading-[1em]">
            {advertisement.name}
          </h3>
        </div>
        <div className="price-and-btn flex items-center justify-between">
          <h4>
            Desde <strong>S/10.00</strong>
          </h4>
          <Button
            variant="tertiary"
            className="grid place-items-center h-[37px] py-1 px-3 text-[14px]"
            onClick={onSeeMore}
          >
            <span className="m-auto">Ver más</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
