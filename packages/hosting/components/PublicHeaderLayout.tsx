import React from "react";
import { InputSearch } from "@/components/ui/InputSearch";
import { WrapperComponent } from "@/components/ui/WrapperComponent";
import { ChevronDown, MapPin, Tags } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const PublicHeaderLayout = () => {
  const router = useRouter();

  const onNavigateGoTo = (pathname: string = "/") => router.push(pathname);

  const authUser: boolean = true;

  return (
    <div className="w-full h-auto bg-quaternary">
      <WrapperComponent>
        <div className="py-3 px-5 grid grid-cols-[auto,1fr,auto,auto]">
          <div className="logotipo flex justify-start items-center pr-2">
            <Link href="/">
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
          <div className="search grid place-items-center px-3">
            <InputSearch
              placeholder="Encuentra discos"
              className="w-[26em] font-medium"
            />
          </div>
          <div className="filters flex items-center justify-center gap-x-5 px-3">
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
                  className="leading-3"
                  onClick={() => onNavigateGoTo("/activity/create")}
                >
                  Crear anuncio
                </Button>
                <Link href="/profile">
                  <div className="w-auto min-w-[87px] h-[47px] px-2 m-auto grid grid-cols-[1fr,1fr] items-center gap-2 bg-tertiary rounded-[12px] cursor-pointer">
                    <div className="grid place-items-center">
                      <Image
                        src="/images/avatar.webp"
                        width={29}
                        height={29}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-primary font-bold grid place-items-center">
                      <ChevronDown />
                    </div>
                  </div>
                </Link>
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
