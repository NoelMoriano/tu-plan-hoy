import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface Props {
  company: Company;
  onSeeMore: () => void;
}

export const CompanyCard = ({ company, onSeeMore }: Props) => {
  return (
    <div className="w-full max-w-[17em] p-3 bg-quaternary rounded-[10px]">
      <div className="img">
        <Image
          src={
            company?.coverImage.thumbUrl ||
            company?.coverImage.url ||
            "/images/img-no-found.jpg"
          }
          width={320}
          height={320}
          alt={company?.name || ""}
          className="w-full h-full object-contain rounded-[5px]"
        />
      </div>
      <div className="footer pt-3">
        <div className="title">
          <h3 className="text-primary font-bold text-[20px] leading-[1em]">
            {company?.name}
          </h3>
        </div>
        <div className="price-and-btn flex items-center justify-between">
          <div />
          <Button
            variant="tertiary"
            className="grid place-items-center h-[30px] py-1 px-3 text-[14px]"
            onClick={onSeeMore}
          >
            <span className="m-auto">Ver más</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
