"use client";
import React from "react";
import { FormSearchNightClubs } from "@/components/FormSearchNightClubs";
import { Star } from "lucide-react";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { FeaturedSitesCard } from "@/components/FeaturedSitesCard";
import { NightClubCard } from "@/components/NightClubCard";
import { FormRecomendedForYou } from "@/components/FormRecomendedForYou";
import { DiscountAndNews } from "@/components/DiscountAndNews";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const router = useRouter();

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);

  const onSeeMore = () => onNavigateGoTo("/events/aniversario/aniversario-10");

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
      <div className="featured-sites">
        <WrapperComponent>
          <div className="content-wrapper px-3 py-11 text-secondary">
            <div className="title flex items-center gap-2 mb-5">
              <Star size={30} />{" "}
              <h2 className="text-[32px] font-bold ">Sitios destacados</h2>
            </div>
            <div className="cards-wrapper flex flex-wrap justify-center gap-5">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <FeaturedSitesCard key={index} onSeeMore={onSeeMore} />
              ))}
            </div>
          </div>
        </WrapperComponent>
      </div>
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
      <div className="recomended-for-you-section">
        <WrapperComponent>
          <div className="content-wrapper px-3 py-11 text-secondary">
            <div className="title flex items-center gap-2 mb-5">
              <h2 className="text-[32px] font-bold leading-[1em]">
                Sitios recomendados para tí
              </h2>
            </div>
            <div className="cards-wrapper flex flex-wrap justify-center gap-5">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <FeaturedSitesCard key={index} onSeeMore={onSeeMore} />
              ))}
            </div>
          </div>
        </WrapperComponent>
      </div>
      <div className="options-more">
        <WrapperComponent>
          <div className="content-wrapper px-3 py-11 text-secondary">
            <div className="title flex items-center gap-2 mb-5">
              <h2 className="text-[24px] font-bold ">Más opciones</h2>
            </div>
            <div className="cards-wrapper flex flex-wrap justify-center gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <NightClubCard key={index} onSeeMore={onSeeMore} />
              ))}
            </div>
            <div className="grid place-items-center my-[2em]">
              <Button className="px-[2em]">Cargar más</Button>
            </div>
          </div>
        </WrapperComponent>
      </div>
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
