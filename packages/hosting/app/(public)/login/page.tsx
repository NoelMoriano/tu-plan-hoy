import React from "react";
import Image from "next/image";
import { FormLogin } from "@/app/(public)/login/FormLogin";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full min-h-[100svh] h-auto">
      <div className="w-full bg-quaternary h-[8svh] grid place-items-center">
        <Link href="/">
          <Image
            src="/images/logotipo.png"
            width={170}
            height={170}
            alt="Tu plan hoy - logo"
            className="object-contain"
          />
        </Link>
      </div>
      <div className="w-full h-[92svh] grid grid-cols-2">
        <div className="w-full relative grid place-items-center">
          <Image
            src="/images/bg-login.jpg"
            width={170}
            height={470}
            alt="Tu plan hoy - logo"
            className="w-full h-auto absolute inset-0 z-20"
          />
          <div className="relative z-30 text-white">
            <h1 className="font-extrabold w-[10em] m-auto mt-[7em] text-[48px] leading-[1.2em] mb-3">
              ¡Es hora de salir!
            </h1>
            <p className="font-light w-[15em] text-[32px] text-tertiary">
              Inicia sesión para encontrar la discoteca perfecta para ti.
            </p>
          </div>
        </div>
        <div className="w-full h-full bg-white grid place-items-center">
          <div className="w-full h-auto max-w-[33em] p-5 m-auto">
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
