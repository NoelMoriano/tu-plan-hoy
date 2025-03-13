"use client";
import React from "react";
import Image from "next/image";
import { CarouselGallery } from "@/app/(public)/events/[eventType]/[event]/CarouselGallery";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { getYouTubeId } from "@/utils/getYouTubeId";

interface Props {
  company: Company;
}

export const LeftComponent = ({ company }: Props) => {
  return (
    <div className="w-full grid place-items-center px-4">
      <Image
        src={
          company?.coverImage?.thumbUrl ||
          company?.coverImage?.url ||
          "/images/image-no-found.png"
        }
        width={733}
        height={458}
        sizes="10"
        alt="Tu plan hoy - logo"
        className="object-contain rounded-[1em] mb-8"
      />
      <div className="w-full titles text-primary mb-8 flex justify-start items-center gap-[1em]">
        <Image
          src={
            company?.logo?.thumbUrl ||
            company?.logo?.url ||
            "/images/image-no-found.png"
          }
          width={50}
          height={50}
          alt="Tu plan hoy - logo"
          className="w-[4.8em] h-[4.8em] object-contain rounded-full border-secondary border-[.2em]"
        />{" "}
        <h1 className="text-[48px] md:text-[90px] font-semibold leading-[.9em]">
          {company?.name || ""}
        </h1>
      </div>
      <div className="categories w-full mb-8">
        <div className="text-[16px] text-primary font-semibold mb-2">
          Categorias:
        </div>
        <div className="w-full flex gap-3 flex-wrap">
          {company.categories.map((category, index) => (
            <div
              key={index}
              className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold grid place-items-center rounded-[5px]"
            >
              <span className="text-center capitalize">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="event-description mb-[2em]">
          <h3 className="text-[16px] text-primary font-bold mb-[.5em]">
            Descripción:
          </h3>
          <pre className="text-[18px] text-primary font-[500] font-['Urbanist'] whitespace-pre-wrap">
            <p className="whitespace-pre-line">{company.description}</p>
          </pre>
        </div>
      </div>
      <div className="w-full my-8">
        <h3 className="text-primary font-bold text-[16px] mb-6">
          Fotos del sitio:
        </h3>
        <CarouselGallery />
        <div className="w-full my-4">
          <div className="video-card overflow-hidden rounded-[10px]">
            <LiteYouTubeEmbed
              id={getYouTubeId(company.youTubeVideoUrl)}
              adNetwork={true}
              title="La mejor musica en bizarro"
              iframeClass="w-full h-full"
              poster="maxresdefault"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
