import React, { useEffect } from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { default as Cities } from "@/app/data-list/cities.json";
import { concat } from "lodash";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { Form } from "@/components/ui/Form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "@/hooks/useFormUtils";

interface FormData {
  city: SelectOption[];
  categories: SelectOption[];
}

export const FormSearchResults = () => {
  const { redirectToWithSearchKey } = useSearchParamsState();

  const schema = yup.object({
    city: yup.array().required(),
    categories: yup.array().required(),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  console.log("errors: ", errors);

  useEffect(() => {
    reset({
      city: undefined,
      categories: undefined,
    });
  }, []);

  const onSubmit = (formData: FormData) => {
    redirectToWithSearchKey("/search", {
      filters: {
        city: formData?.city.map((city) => city.value) || [],
        categories:
          formData?.categories.map((category) => category.value) || [],
      },
    });
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
              error={error(name)}
              required={required(name)}
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
              error={error(name)}
              required={required(name)}
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
