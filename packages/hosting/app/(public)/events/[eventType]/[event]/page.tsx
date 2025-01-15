"use client";
import React from "react";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import Image from "next/image";
import { RightComponent } from "@/app/(public)/events/[eventType]/[event]/RigthComponent";
import { LeftComponent } from "@/app/(public)/events/[eventType]/[event]/LeftComponent";
import { NightClubCard } from "@/components/NightClubCard";
import { useRouter } from "next/navigation";

export default function EventPage() {
  const router = useRouter();

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);

  const onSeeMore = () => onNavigateGoTo("/events/aniversario/aniversario-10");

  return (
    <div className="w-full min-h-[100svh] h-auto relative overflow-hidden bg-white">
      <div className="absolute top-0 w-full h-auto">
        <Image
          src="/images/ads-banner.png"
          width={1233}
          height={758}
          sizes="10"
          alt="Tu plan hoy - logo"
          className="object-contain w-full h-full translate-y-[-7em]"
          style={{
            maskImage: "linear-gradient(#000 70%, transparent)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white from-10% via-white via-40% bg-primary to-100% bg-opacity-60"></div>
      </div>
      <WrapperComponent className="relative z-50">
        <div className="w-full h-full grid grid-cols-[733px,1fr] gap-2 pt-[2rem]">
          <LeftComponent />
          <RightComponent />
        </div>
        <div className="options-more">
          <WrapperComponent>
            <div className="content-wrapper text-secondary mb-16">
              <div className="title flex items-center gap-2 mb-5">
                <h2 className="text-[24px] font-bold ">Sugerencias para tí</h2>
              </div>
              <div className="cards-wrapper flex flex-wrap gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <NightClubCard key={index} onSeeMore={onSeeMore} />
                ))}
              </div>
            </div>
          </WrapperComponent>
        </div>
      </WrapperComponent>
    </div>
  );
}
