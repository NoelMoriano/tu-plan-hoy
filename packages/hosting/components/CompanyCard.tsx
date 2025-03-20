import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  size?: "small" | "medium" | "large";
  company: Company;
  onGoToCompany: (nameId: string) => void;
}

export const CompanyCard = ({
  size = "medium",
  company,
  onGoToCompany,
}: Props) => {
  const sizes = {
    small: "text-[14px]",
    medium: "text-[16px]",
    large: "text-[19px]",
  };

  return (
    <div
      className={twMerge(
        "w-[17em] h-[20em] bg-quaternary rounded-[10px] relative overflow-hidden grid grid-rows-[11em,1fr]",
        sizes[size],
      )}
    >
      <div className="img w-full h-full">
        <Image
          src={
            company?.coverImage.thumbUrl ||
            company?.coverImage.url ||
            "/images/img-no-found.jpg"
          }
          width={290}
          height={338}
          alt={company?.name || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="footer w-full p-3 grid grid-rows-[1fr,1fr,auto]">
        <div className="title flex items-center gap-2">
          <Image
            src={
              company?.logo?.thumbUrl ||
              company?.logo?.url ||
              "/images/image-no-found.png"
            }
            width={30}
            height={30}
            alt="Tu plan hoy - logo"
            className="w-[1.4em] h-[1.4em] z-20 object-contain rounded-full"
          />
          <h3 className="text-primary font-bold text-[1.2em] leading-[1em] w-full max-w-full line-clamp-2 text-ellipsis overflow-hidden">
            {company?.name}
          </h3>
        </div>
        <div className="w-full max-w-full inline-flex items-center gap-1 overflow-x-auto">
          {(company?.categories || []).map((category, index) => (
            <div
              key={index}
              className="bg-tertiary w-auto h-[2em] pl-3 pr-3 rounded-[3em] text-[.7em] text-secondary capitalize grid place-items-center font-semibold whitespace-nowrap"
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className="price-and-btn flex items-end justify-between">
          <div />
          <Button
            variant="tertiary"
            className="w-auto h-[2em] grid place-items-center px-[1em] py-0 text-[.75em]"
            onClick={() => onGoToCompany(company.nameId)}
          >
            <span className="m-auto">Ver más</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
