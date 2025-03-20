import React from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { default as Cities } from "@/app/data-list/cities.json";
import { concat } from "lodash";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { Form } from "@/components/ui/Form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  city: string[];
  categories: string[];
}

export const FormSearchNightClubs = () => {
  const { updateSearchKey } = useSearchParamsState();

  const schema = yup.object({
    city: yup.array().required(),
    categories: yup.array().required(),
  });

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: any) => {
    console.log("formData: ", formData);
  };

  return (
    <div className="w-full max-w-[33em] px-[1em] m-auto absolute z-40">
      <div className="title">
        <h1 className="text-white text-center text-[36px] md:text-[48px] leading-[1.2em] font-bold mb-9">
          ¡Déjanos ayudarte a descubrir las mejores discotecas!
        </h1>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, value, name } }) => (
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
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="categories"
          control={control}
          render={({ field: { onChange, value, name } }) => (
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
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Button
          variant="tertiary"
          className="w-[20em] max-w-[27em] m-auto my-2 px-10"
          type="submit"
        >
          Descubrir discotecas
        </Button>
      </Form>
    </div>
  );
};
