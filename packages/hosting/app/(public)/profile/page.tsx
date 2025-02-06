"use client";

import React from "react";
import Image from "next/image";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import {
  Building2Icon,
  File,
  FilesIcon,
  LockKeyhole,
  LogOutIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PersonalInformation } from "@/app/(public)/profile/PersonalInformation";
import { PrivacyAndSecurity } from "@/app/(public)/profile/PrivacyAndSecure";
import { MyCompanies } from "@/app/(public)/profile/MyCompanies";
import { MyAds } from "@/app/(public)/profile/MyAds";

interface Menu {
  id: string;
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
}

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeView = searchParams.get("type") || "personal_information";

  const onNavigateGoTo = (pathname: string) => router.push(pathname);

  const MenuList: Menu[] = [
    {
      id: "personal_information",
      icon: <File className="text-primary" />,
      name: "Información personal",
      onClick: () => onNavigateGoTo("/profile?type=personal_information"),
    },
    {
      id: "privacy_and_security",
      icon: <LockKeyhole className="text-primary" />,
      name: "Privacidad y seguridad",
      onClick: () => onNavigateGoTo("/profile?type=privacy_and_security"),
    },
    {
      id: "my_companies",
      icon: <Building2Icon className="text-primary" />,
      name: "Mis empresas",
      onClick: () => onNavigateGoTo("/profile?type=my_companies"),
    },
    {
      id: "my_ads",
      icon: <FilesIcon className="text-primary" />,
      name: "Mis anuncios",
      onClick: () => onNavigateGoTo("/profile?type=my_ads"),
    },
  ];

  const showContent = () => {
    switch (typeView) {
      case "personal_information":
        return <PersonalInformation />;
      case "privacy_and_security":
        return <PrivacyAndSecurity />;
      case "my_companies":
        return <MyCompanies />;
      case "my_ads":
        return <MyAds />;
      default:
        return <PersonalInformation />;
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
                      onClick={menu.onClick}
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
