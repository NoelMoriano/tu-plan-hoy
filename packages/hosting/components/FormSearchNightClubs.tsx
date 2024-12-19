import React from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export const FormSearchNightClubs = () => {
  return (
    <div className="w-full max-w-[33em] m-auto absolute z-50">
      <div className="title">
        <h1 className="text-white text-center text-[48px] leading-[1.2em] font-bold mb-9">
          ¡Déjanos ayudarte a descubrir las mejores discotecas de Perú!
        </h1>
      </div>
      <Form>
        <Input placeholder="Ingresa tu ubicación" />
        <Input type="date" placeholder="Ingresa la fecha" />
        <Select
          options={[
            {
              label: "Cumpleaños",
              value: "birthdate",
            },
            {
              label: "Casual",
              value: "casual",
            },
          ]}
        />
        <Button
          variant="tertiary"
          className="w-[20em] max-w-[27em] m-auto my-2 px-10"
        >
          Descubrir discotecas
        </Button>
      </Form>
    </div>
  );
};
