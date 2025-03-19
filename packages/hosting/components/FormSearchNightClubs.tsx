import React from "react";
import { Form } from "@/components/ui/Form";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { default as Cities } from "@/app/data-list/cities.json";
import { concat } from "lodash";

export const FormSearchNightClubs = () => {
  return (
    <div className="w-full max-w-[33em] px-[1em] m-auto absolute z-40">
      <div className="title">
        <h1 className="text-white text-center text-[36px] md:text-[48px] leading-[1.2em] font-bold mb-9">
          ¡Déjanos ayudarte a descubrir las mejores discotecas!
        </h1>
      </div>
      <Form>
        <Select
          multiple
          options={concat(
            [
              {
                label: "Todos",
                value: "all",
              },
            ],
            Cities.map((city) => ({
              label: city.value,
              value: city.id,
            })),
          )}
        />
        <Select
          placeholder="¿En que ciudad te encuentras?"
          options={concat(
            [
              {
                label: "Todos",
                value: "all",
              },
            ],
            Cities.map((city) => ({
              label: city.value,
              value: city.id,
            })),
          )}
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
