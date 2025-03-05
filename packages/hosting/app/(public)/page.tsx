"use client";
import React, { useEffect, useState, useTransition } from "react";
import { FormSearchNightClubs } from "@/components/FormSearchNightClubs";
import { Star } from "lucide-react";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { FeaturedSitesCard } from "@/components/FeaturedSitesCard";
import { DiscountAndNews } from "@/components/DiscountAndNews";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { currentConfig } from "@/config";
import { AdvertisementSkeleton } from "@/components/AdvertisementSkeleton";
import { isEmpty, orderBy } from "lodash";
import dayjs from "dayjs";

export default function HomePage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [isPendingCompanies, startTransitionCompanies] = useTransition();

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);
  const onSeeMore = () => onNavigateGoTo("/events/aniversario/aniversario-10");

  const fetchCompanies = () => {
    startTransitionCompanies(async () => {
      try {
        const _companies: AxiosResponse<Company[]> = await axios.get<Company[]>(
          `${currentConfig.apiUrl}/companies`,
        );

        setCompanies(_companies.data);
      } catch (err) {
        console.log("ErrorFetchAdvertisements: ", err);
      }
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const advertisementsView = orderBy(
    companies,
    (advertisement) => dayjs.unix(advertisement.createAt._seconds).valueOf(),
    "desc",
  );

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
              <h2 className="text-[32px] font-bold ">Discos destacados</h2>
            </div>
            <div className="cards-wrapper flex flex-wrap justify-center gap-5">
              {isPendingCompanies ? (
                <div className="w-full flex justify-center flex-wrap gap-[1em]">
                  <AdvertisementSkeleton />
                  <AdvertisementSkeleton />
                  <AdvertisementSkeleton />
                </div>
              ) : isEmpty(companies) ? (
                <p className="text-[1.2em]">No se encontraron resultados...</p>
              ) : (
                advertisementsView.map((advertisement, index) => (
                  <FeaturedSitesCard
                    key={index}
                    company={advertisement}
                    onSeeMore={onSeeMore}
                  />
                ))
              )}
            </div>
          </div>
        </WrapperComponent>
      </div>
      {/*<div className="w-full h-[560px] relative bg-blend-multiply bg-primary grid place-items-center overflow-hidden">*/}
      {/*  <Image*/}
      {/*    src="/images/banner-sitios-recomendados.jpg"*/}
      {/*    width={970}*/}
      {/*    height={470}*/}
      {/*    alt="Tu plan hoy - logo"*/}
      {/*    sizes="10"*/}
      {/*    className="w-full h-full absolute z-20 object-cover"*/}
      {/*  />*/}
      {/*  <div className="bg-item absolute z-40 w-full h-full" />*/}
      {/*  <FormRecomendedForYou />*/}
      {/*</div>*/}
      {/*<div className="recomended-for-you-section">*/}
      {/*  <WrapperComponent>*/}
      {/*    <div className="content-wrapper px-3 py-11 text-secondary">*/}
      {/*      <div className="title flex items-center gap-2 mb-5">*/}
      {/*        <h2 className="text-[32px] font-bold leading-[1em]">*/}
      {/*          Sitios recomendados para tí*/}
      {/*        </h2>*/}
      {/*      </div>*/}
      {/*      <div className="cards-wrapper flex flex-wrap justify-center gap-5">*/}
      {/*        {isPendingCompanies ? (*/}
      {/*          <div className="w-full flex justify-center flex-wrap gap-[1em]">*/}
      {/*            <AdvertisementSkeleton />*/}
      {/*            <AdvertisementSkeleton />*/}
      {/*            <AdvertisementSkeleton />*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          advertisementsView.map((advertisement, index) => (*/}
      {/*            <FeaturedSitesCard*/}
      {/*              key={index}*/}
      {/*              company={advertisement}*/}
      {/*              onSeeMore={onSeeMore}*/}
      {/*            />*/}
      {/*          ))*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </WrapperComponent>*/}
      {/*</div>*/}
      {/*<div className="options-more">*/}
      {/*  <WrapperComponent>*/}
      {/*    <div className="content-wrapper px-3 py-11 text-secondary">*/}
      {/*      <div className="title flex items-center gap-2 mb-5">*/}
      {/*        <h2 className="text-[24px] font-bold ">Más opciones</h2>*/}
      {/*      </div>*/}
      {/*      <div className="cards-wrapper flex flex-wrap justify-center gap-5">*/}
      {/*        {isPendingCompanies ? (*/}
      {/*          <div className="w-full flex justify-center flex-wrap gap-[1em]">*/}
      {/*            <AdvertisementSkeleton fontSize="12px" />*/}
      {/*            <AdvertisementSkeleton fontSize="12px" />*/}
      {/*            <AdvertisementSkeleton fontSize="12px" />*/}
      {/*            <AdvertisementSkeleton fontSize="12px" />*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          advertisementsView.map((advertisement, index) => (*/}
      {/*            <NightClubCard*/}
      {/*              key={index}*/}
      {/*              advertisement={advertisement}*/}
      {/*              onSeeMore={onSeeMore}*/}
      {/*            />*/}
      {/*          ))*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*      <div className="grid place-items-center my-[2em]">*/}
      {/*        <Button className="px-[2em]">Cargar más</Button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </WrapperComponent>*/}
      {/*</div>*/}
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
