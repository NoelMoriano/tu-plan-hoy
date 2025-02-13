import React from "react";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { ChevronRight } from "lucide-react";

export const PrivacyAndSecurity = () => {
  return (
    <div className="information-items">
      <div className="header flex justify-between flex-wrap gap-3 mb-5">
        <div>
          <h1 className="text-primary font-bold text-[40px] leading-[1em]">
            Privacidad y seguridad
          </h1>
        </div>
      </div>
      <div className="content w-full">
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-[1fr,12em] gap-8">
            <div>
              <Input type="password" label="Contraseña" placeholder="******" />
            </div>
            <div className="flex items-end">
              <Button
                variant="secondary"
                className="text-secondary px-2 w-full"
              >
                Cambiar contraseña
              </Button>
            </div>
          </div>
        </Form>
        <div className="w-full mt-12 mb-6">
          <div>
            <div className="text-secondary font-bold text-[20px] text-left">
              <span>Compartir Información Personal</span>
            </div>
            <ul className="list-none">
              <li className="grid grid-cols-[1fr,8em] gap-[1.5em] justify-between border-tertiary border-b-[1px] py-5">
                <div className="text-primary font-bold text-[16px]">
                  Mantener mi información personal oculta
                </div>
                <div className="text-primary font-bold text-[16px] flex justify-end items-center">
                  SI
                </div>
              </li>
              <li className="grid grid-cols-[1fr,8em] gap-[1.5em] justify-between border-tertiary border-b-[1px] py-5">
                <div className="text-primary font-bold text-[16px]">
                  Permitir que otros usuarios vean mi nombre y foto de perfil
                </div>
                <div className="text-primary font-bold text-[16px] flex justify-end items-center">
                  SI
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full mb-6">
          <div>
            <div className="text-secondary font-bold text-[20px] text-left">
              <span>Datos de Localización</span>
            </div>
            <ul className="list-none">
              <li className="grid grid-cols-[1fr,8em] gap-[1.5em] justify-between border-tertiary border-b-[1px] py-5">
                <div className="text-primary font-bold text-[16px]">
                  Permitir que mi ubicación sea visible para los eventos
                  cercanos
                </div>
                <div className="text-primary font-bold text-[16px] flex justify-end items-center">
                  SI
                </div>
              </li>
              <li className="grid grid-cols-[1fr,8em] gap-[1.5em] justify-between border-tertiary border-b-[1px] py-5">
                <div className="text-primary font-bold text-[16px]">
                  No quiero compartir mi ubicación
                </div>
                <div className="text-primary font-bold text-[16px] flex justify-end items-center">
                  SI
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full my-10">
          <div className="flex justify-between font-bold text-primary">
            <div className="text-[16px]">
              <span>Eliminar mi cuenta</span>
            </div>
            <div className="cursor-pointer">
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
