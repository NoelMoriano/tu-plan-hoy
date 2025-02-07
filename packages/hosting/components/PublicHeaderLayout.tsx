"use client";

import React, { useState } from "react";
import { InputSearch } from "@/components/ui/InputSearch";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import {
  ChevronDown,
  LogOutIcon,
  MapPin,
  MenuIcon,
  SearchIcon,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MenuList } from "@/app/data-list/menuList";

export const PublicHeaderLayout = () => {
  const router = useRouter();
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);

  const authUser: boolean = true;

  return (
    <div className="w-full h-auto bg-quaternary">
      <WrapperComponent>
        <div className="py-3 px-5 grid grid-cols-[auto,1fr,auto,auto]">
          <div className="mobile-left-icons flex md:hidden gap-2 items-center">
            <Button
              variant="secondary"
              className="leading-3 visible md:hidden rounded-[7px]"
            >
              <MenuIcon className="text-primary" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => onNavigateGoTo("/search")}
              className="leading-3 visible md:hidden rounded-[7px]"
            >
              <SearchIcon className="text-primary" />
            </Button>
          </div>
          <div className="logotipo flex justify-start items-center p-0 md:pr-2">
            <Link href="/" className="m-auto md:m-0">
              <Image
                src="/images/logotipo.png"
                width={167}
                height={30}
                sizes="10"
                alt="Tu plan hoy - logo"
                className="w-[167px] h-[30px] object-contain"
              />
            </Link>
          </div>
          <div className="search hidden md:grid place-items-center px-3">
            <InputSearch
              placeholder="Encuentra discos"
              className="w-[26em] font-medium"
            />
          </div>
          <div className="filters hidden md:flex items-center justify-center gap-x-5 px-3">
            <div className="category-icon flex flex-col items-center justify-center text-primary gap-[1px] hover:bg-tertiary p-1 px-1.5 rounded-[5px] cursor-pointer">
              <MapPin size={20} />
              <span className="font-bold text-[12px]">Cuidad</span>
            </div>
            <div className="category-icon flex flex-col items-center justify-center text-primary gap-[1px] hover:bg-tertiary p-1 px-1.5 rounded-[5px] cursor-pointer">
              <Tags size={20} />
              <span className="font-bold text-[12px]">Categorías</span>
            </div>
          </div>
          <div className="buttons-and-avatar flex justify-end items-center pl-3 gap-2">
            {authUser && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => onNavigateGoTo("/activity/create")}
                  className="leading-3 visible md:hidden rounded-[7px]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM13 15H15V11H19V9H15V5H13V9H9V11H13V15Z"
                      fill="#231473"
                      className="text-primary"
                    />
                  </svg>
                </Button>
                <Button
                  className="leading-3 hidden md:flex"
                  onClick={() => onNavigateGoTo("/activity/create")}
                >
                  Crear anuncio
                </Button>
                <Menu>
                  <MenuButton
                    className="w-auto py-[10px] xs:p-[5px] min-w-[53px] md:min-w-[87px] flex justify-center md:grid grid-cols-[1fr,1fr] items-center gap-2 bg-tertiary text-primary hover:bg-tertiary-dark focus-none p-3 rounded-[5px] text-[14px] font-bold cursor-pointer"
                    onClick={() => setIsOpenProfile(!isOpenProfile)}
                  >
                    <div className="grid place-items-center">
                      <Image
                        src="/images/avatar.webp"
                        width={29}
                        height={29}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div className="hidden md:grid place-items-center text-primary font-bold">
                      <ChevronDown />
                    </div>
                  </MenuButton>
                  <MenuItems
                    anchor="bottom end"
                    className="z-50 p-3 bg-white rounded-[.7em] w-[15em] shadow-black-200 shadow-lg"
                  >
                    {MenuList.map((menu, index) => (
                      <MenuItem key={index}>
                        <Link
                          href={menu.url}
                          className="flex gap-2 data-[focus]:bg-blue-100 p-[.5em] text-primary text-[16px] font-semibold rounded-[.5em]"
                        >
                          <span>{menu.icon}</span>
                          <span>{menu.name}</span>
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <Link
                        className="flex gap-2 data-[focus]:bg-red-500 p-[.5em] text-primary hover:text-white text-[16px] font-semibold rounded-[.5em]"
                        href="#"
                      >
                        <span>
                          <LogOutIcon />
                        </span>
                        <span>Cerrar sesión</span>
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            )}
            {!authUser && (
              <>
                {" "}
                <Button
                  variant="secondary"
                  className="leading-3"
                  onClick={() => onNavigateGoTo("/login")}
                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="secondary"
                  className="leading-3"
                  onClick={() => onNavigateGoTo("/register")}
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
};
