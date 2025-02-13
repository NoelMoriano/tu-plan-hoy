"use client";

import React from "react";
import Image from "next/image";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { LogOutIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PersonalInformation } from "@/app/(private)/profile/PersonalInformation";
import { PrivacyAndSecurity } from "@/app/(private)/profile/PrivacyAndSecure";
import { MyCompanies } from "@/app/(private)/profile/MyCompanies";
import { MyAds } from "@/app/(private)/profile/MyAds";
import { MenuList } from "@/app/data-list/menuList";
import { UserProfile } from "@/app/(private)/profile/UserProfile";

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeView = searchParams.get("type") || "default";

  const onNavigateGoTo = (pathname: string) => router.push(pathname);

  const showContent = () => {
    switch (typeView) {
      case "default":
        return <UserProfile />;
      case "personal_information":
        return <PersonalInformation />;
      case "privacy_and_security":
        return <PrivacyAndSecurity />;
      case "my_companies":
        return <MyCompanies />;
      case "my_ads":
        return <MyAds />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="w-full">
      <WrapperComponent>
        <div className="grid grid-cols-1 md:grid-cols-[1fr,65%] px-5 py-7 gap-20">
          <div className="left-col hidden md:flex">
            <div className="information-card">
              <div className="avatar-item bg-quaternary rounded-[10px] p-4 mb-5">
                <div className="grid place-items-center">
                  <Image
                    src="/images/avatar.webp"
                    width={180}
                    height={180}
                    alt="informacion del usuario"
                    className="rounded-full object-cover mb-3"
                  />
                </div>
                <div className="grid place-items-center">
                  <span className="font-bold text-primary text-center text-[32px] leading-[1em]">
                    Juanita Carmelo
                  </span>
                </div>
              </div>
              <div className="menu-item-list bg-quaternary p-4 rounded-[10px]">
                <ul className="grid gap-4">
                  {MenuList.map((menu, index) => (
                    <li
                      key={index}
                      className={`grid grid-cols-[1.5em,1fr] gap-[.5em] cursor-pointer py-1 px-2 hover:bg-tertiary rounded-[6px] ${typeView === menu.id && "bg-tertiary"}`}
                      onClick={() => onNavigateGoTo(menu.url)}
                    >
                      <div className="grid place-items-center">{menu.icon}</div>
                      <div className="flex justify-start items-center">
                        <span className="text-primary text-[16px] font-bold">
                          {menu.name}
                        </span>
                      </div>
                    </li>
                  ))}
                  <li
                    className={`grid grid-cols-[1.5em,1fr] gap-[.5em] cursor-pointer py-1 px-2 hover:bg-red-500 hover:text-white rounded-[6px]`}
                    onClick={() => console.log("Cerrar sesión")}
                  >
                    <div className="grid place-items-center">
                      <LogOutIcon />
                    </div>
                    <div className="flex justify-start items-center">
                      <span className="text-[16px] font-bold">
                        Cerrar sesión
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right-col">{showContent()}</div>
        </div>
      </WrapperComponent>
    </div>
  );
}
