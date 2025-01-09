import React from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import Link from "next/link";
import { Divider } from "@/components/ui/Divider";
import Image from "next/image";
import { Select } from "@/components/ui/Select";

export const FormRegister = () => {
  return (
    <div className="w-full h-full">
      <div className="title mb-7">
        <h2 className="leading-[1.2em] text-[32px] text-primary font-bold">
          Bienvenido a <span className="text-secondary">Tu</span>Plan
          <span className="text-secondary">Hoy</span>
        </h2>
      </div>
      <Form>
        <Input label="Nombre(s)" placeholder="Tus nombres" />
        <Input label="Apellido paterno" placeholder="Tu Apellido paterno" />
        <Input label="Apellido materno" placeholder="Tu Apellido materno" />
        <Input
          label="Correo electrónico"
          placeholder="tucorreo@gmail.com"
          type="email"
        />
        <Input label="Contraseña" placeholder="*************" />
        <Input label="Repetir Contraseña" placeholder="*************" />
        <Input label="DNI" placeholder="75075882" />
        <Select
          label="País"
          options={[
            {
              label: "Perú",
              value: "peru",
            },
            {
              label: "Venezuela",
              value: "venezuela",
            },
          ]}
        />
        <div className="w-full">
          <div className="h-auto">
            <Checkbox
              label={
                <span>
                  He leído y acepta los{" "}
                  <a href="#" className="font-bold">
                    Términos y Condiciones
                  </a>
                </span>
              }
              htmlFor="terminos_y_condiciones"
            />
          </div>
          <div className="h-auto">
            <Checkbox
              label={
                <span>
                  Quiero recibir futuras promociones y noticias de{" "}
                  <a href="#" className="font-bold">
                    TuPlanHoy
                  </a>
                </span>
              }
              htmlFor="tuplanhoy"
            />
          </div>
        </div>
        <Button className="w-full m-auto my-2 px-10">Registrarse</Button>
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
        <Link href="/login" className="text-[14px] font-medium text-secondary">
          ¿Ya tienes cuenta?
        </Link>
        <Link href="/login" className="text-[14px] font-bold text-primary">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};
