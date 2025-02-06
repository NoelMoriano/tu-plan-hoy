import React from "react";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Divider } from "@/components/ui/Divider";

export const PersonalInformation = () => {
  return (
    <div className="information-items">
      <div className="header flex justify-between flex-wrap gap-3 mb-5">
        <div className="w-full">
          <h1 className="text-primary font-bold text-[40px] leading-[1em]">
            Información personal
          </h1>
        </div>
        <div className="w-full flex justify-end">
          <Button variant="secondary" className="px-6 mr-0">
            Editar
          </Button>
        </div>
      </div>
      <div className="content w-full">
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Input label="Nombre(s)" placeholder="Tus nombres" />
            </div>
            <div>
              <Input
                label="Apellido paterno"
                placeholder="Tu apellido paterno"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Input
                label="Apellido materno"
                placeholder="Tu Apellino materno"
              />
            </div>
            <div>
              <Select
                label="País"
                placeholder="Tu apellido paterno"
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
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Input label="DNI" placeholder="75******" />
            </div>
            <div>
              <Select
                label="Genero"
                options={[
                  {
                    label: "Masculino",
                    value: "male",
                  },
                  {
                    label: "Femenino",
                    value: "female",
                  },
                  {
                    label: "Otro",
                    value: "other",
                  },
                ]}
              />
            </div>
          </div>
        </Form>
        <Divider className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Form>
              <Input
                type="email"
                label="Email"
                placeholder="tucorreo@gmail.com"
              />
              <div className="flex justify-end">
                <Button variant="secondary" className="text-secondary px-5">
                  Confirmar correo
                </Button>
              </div>
            </Form>
          </div>
          <div>
            <Form>
              <Input type="number" label="Teléfono" placeholder="123456789" />
              <div className="flex justify-end">
                <Button variant="secondary" className="text-secondary px-5">
                  Confirmar teléfono
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
