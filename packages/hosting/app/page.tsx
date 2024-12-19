import React from "react";
import { FormSearchNightClubs } from "@/components/FormSearchNightClubs";
import { Star } from "lucide-react";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { FeaturedSitesCard } from "@/components/FeaturedSitesCard";
import { NightClubCard } from "@/components/NightClubCard";
import { ImageComponent } from "@/components/ui/Image";
import { FormRecomendedForYou } from "@/components/FormRecomendedForYou";

export default function HomePage() {
  return (
    <div className="general-wrapper">
      <div className="w-full h-[91svh] relative bg-blend-multiply bg-primary grid place-items-center overflow-hidden">
        <video
          width="1243"
          height="970"
          controls={false}
          muted
          autoPlay
          loop
          className="w-full h-auto absolute z-20"
        >
          <source src="/videos/video-bg.mp4" type="video/mp4" />
          <source src="/videos/video-bg.mp4" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <div
          className="bg-item absolute z-40 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(35, 20, 115, 70%), rgba(35, 20, 115, 70%)",
          }}
        />
        <FormSearchNightClubs />
      </div>
      <div className="featured-sites">
        <WrapperComponent>
          <div className="content-wrapper px-3 py-11 text-secondary">
            <div className="title flex items-center gap-2 mb-5">
              <Star size={30} />{" "}
              <h2 className="text-4xl font-bold ">Sitios destacados</h2>
            </div>
            <div className="cards-wrapper flex flex-wrap gap-5">
              <FeaturedSitesCard />
              <FeaturedSitesCard />
              <FeaturedSitesCard />
              <FeaturedSitesCard />
              <FeaturedSitesCard />
              <FeaturedSitesCard />
            </div>
          </div>
        </WrapperComponent>
      </div>
      <div className="w-full h-[560px] relative bg-blend-multiply bg-primary grid place-items-center overflow-hidden">
        <ImageComponent
          src="/images/banner-sitios-recomendados.jpg"
          className="w-full h-auto absolute z-20 object-cover"
        />
        <div
          className="bg-item absolute z-40 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(35, 20, 115, 70%), rgba(35, 20, 115, 70%)",
          }}
        />
        <FormRecomendedForYou />
      </div>
      <div className="options-more">
        <WrapperComponent>
          <div className="content-wrapper px-3 py-11 text-secondary">
            <div className="title flex items-center gap-2 mb-5">
              <h2 className="text-4xl font-bold ">Más opciones</h2>
            </div>
            <div className="cards-wrapper flex flex-wrap gap-5">
              <NightClubCard />
              <NightClubCard />
              <NightClubCard />
              <NightClubCard />
              <NightClubCard />
              <NightClubCard />
              <NightClubCard />
              <NightClubCard />
            </div>
          </div>
        </WrapperComponent>
      </div>
    </div>
  );
}
