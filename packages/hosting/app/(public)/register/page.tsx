import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FormRegister } from "@/app/(public)/register/FormRegister";

export default function RegisterPage() {
  return (
    <div className="w-full min-h-[100svh] h-auto">
      <div className="w-full bg-quaternary h-[8svh] grid place-items-center">
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
      <div className="w-full h-[92svh] grid grid-cols-2">
        <div className="w-full relative grid place-items-center">
          <Image
            src="/images/bg-register.jpg"
            width={170}
            height={470}
            sizes="10"
            alt="Tu plan hoy - logo"
            className="w-full h-full object-cover absolute inset-0 z-20"
          />
          <div className="relative z-30 text-white">
            <h1 className="font-extrabold w-[10em] m-auto mt-[5em] text-[48px] leading-[1.2em] mb-3">
              ¡Haz parte de la diversión!
            </h1>
            <p className="font-light w-[15em] text-[32px] text-tertiary">
              Crea tu cuenta y explora discotecas increíbles en Perú.
            </p>
          </div>
        </div>
        <div className="w-full h-full bg-white grid place-items-center">
          <div className="w-full h-auto max-w-[33em] px-5 py-10 m-auto">
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}
