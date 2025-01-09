import React from "react";
import { Form } from "@/components/ui/Form";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export const FormRecomendedForYou = () => {
  return (
    <div className="w-full max-w-[30em] m-auto absolute z-50">
      <div className="title">
        <h1 className="text-white text-center text-4xl font-bold mb-9">
          ¡Planifica tus noches perfectas en Perú con nuestra guía de
          discotecas!
        </h1>
      </div>
      <Form>
        <Select
          options={[
            {
              label: "Disco bar",
              value: "birthdate",
            },
            {
              label: "Disco tematicos",
              value: "casual",
            },
          ]}
        />
        <Button
          variant="tertiary"
          className="w-[20em] max-w-[27em] m-auto my-2 px-10"
        >
          Ver sitios recomendados para tí
        </Button>
      </Form>
    </div>
  );
};
