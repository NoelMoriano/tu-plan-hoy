import React from "react";
import { Form } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const DiscountAndNews = () => {
  return (
    <div className="w-auto h-auto max-w-[30em] absolute z-50 px-[1em]">
      <div className="title">
        <h2 className="text-white text-left text-4xl font-bold mb-9">
          ¡Recibe descuentos y novedades!
        </h2>
      </div>
      <Form>
        <Input placeholder="Escribe tu correo electrónico" />
        <Button variant="tertiary" className="w-[20em] max-w-[20em] my-2 px-10">
          Suscribirse
        </Button>
      </Form>
    </div>
  );
};
