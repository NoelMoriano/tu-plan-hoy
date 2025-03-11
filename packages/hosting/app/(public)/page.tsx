"use client";
import React from "react";
import { FormSearchNightClubs } from "@/components/FormSearchNightClubs";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { DiscountAndNews } from "@/components/DiscountAndNews";
import Image from "next/image";
import { HighlightedCompanies } from "@/app/(public)/HighlightedCompanies";
import { MoreCompanies } from "@/app/(public)/Companies";
import { FormRecomendedForYou } from "@/components/FormRecomendedForYou";

export default function HomePage() {
  return (
    <div className="general-wrapper">
      <div className="w-full h-[80svh] relative bg-blend-multiply bg-primary grid place-items-center overflow-hidden">
        <video
          width="1243"
          height="970"
          controls={false}
          muted
          autoPlay
          loop
          className="w-full h-full absolute z-20 object-cover"
          poster="/images/img-video-bg.webp"
        >
          <source src="/videos/video-bg.mp4" type="video/mp4" />
          <source src="/videos/video-bg.mp4" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <div
          className="bg-item absolute z-40 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(35, 20, 115, 47%), rgba(35, 20, 115, 37%)",
          }}
        />
        <FormSearchNightClubs />
      </div>
      <HighlightedCompanies />
      <div className="w-full h-[560px] relative bg-blend-multiply bg-primary grid place-items-center overflow-hidden">
        <Image
          src="/images/banner-sitios-recomendados.jpg"
          width={970}
          height={470}
          alt="Tu plan hoy - logo"
          sizes="10"
          className="w-full h-full absolute z-20 object-cover"
        />
        <div className="bg-item absolute z-40 w-full h-full" />
        <FormRecomendedForYou />
      </div>
      <MoreCompanies />
      <div className="w-full h-[560px] relative bg-blend-multiply bg-primary flex justify-start items-center overflow-hidden">
        <Image
          src="/images/discount-and-news.jpg"
          width={970}
          height={470}
          alt="Tu plan hoy - logo"
          sizes="10"
          className="w-full h-full absolute z-20 object-cover"
        />
        <WrapperComponent className="relative flex items-center">
          <>
            <div className="bg-item absolute z-40 w-full h-full" />
            <DiscountAndNews />
          </>
        </WrapperComponent>
      </div>
    </div>
  );
}
