import React from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import Link from "next/link";
import { Divider } from "@/components/ui/Divider";
import Image from "next/image";

export const FormLogin = () => {
  return (
    <div className="w-full h-full">
      <div className="title mb-7">
        <h2 className="leading-[1.2em] text-[32px] text-primary font-bold">
          ¡Bienvenido de nuevo!
        </h2>
      </div>
      <Form>
        <Input
          label="Correo electrónico"
          placeholder="tucorreo@gmail.com"
          type="email"
        />
        <Input label="Contraseña" placeholder="*************" />
        <div className="w-full flex justify-between">
          <div className="h-auto">
            <Checkbox label="Recordar mi cuenta" />
          </div>
          <div className="h-auto">
            <Link href="#" className="text-[14px] font-medium text-secondary">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
        <Button className="w-full m-auto my-2 px-10">Iniciar sesión</Button>
      </Form>
      <Divider className="my-7" />
      <div className="w-full flex gap-5 justify-center mb-7">
        <button className="min-w-[152px] bg-quaternary rounded-[10px] py-3 font-medium">
          <div className="flex gap-2 items-center justify-center text-secondary">
            <Image
              src="/images/google-isotipo.png"
              width={30}
              height={30}
              alt="Google - logo"
              className="object-contain"
            />
            Google
          </div>
        </button>
        <button className="min-w-[152px] bg-quaternary rounded-[10px] py-3 font-medium">
          <div className="flex gap-2 items-center justify-center text-secondary">
            <Image
              src="/images/facebook-isotipo.png"
              width={30}
              height={30}
              alt="Google - logo"
              className="object-contain"
            />
            Facebook
          </div>
        </button>
      </div>

      <div className="w-full flex flex-col gap-1 text-center">
        <Link
          href="/register"
          className="text-[14px] font-medium text-secondary"
        >
          ¿No tienes cuenta?
        </Link>
        <Link href="/register" className="text-[14px] font-bold text-primary">
          Regístrate
        </Link>
      </div>
    </div>
  );
};
