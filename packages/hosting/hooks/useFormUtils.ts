import { useEffect } from "react";
import { get, isEmpty, isString } from "lodash";
import * as yup from "yup";
import { FieldErrors } from "react-hook-form/dist/types/errors";

interface Props<FormData extends ObjectType> {
  errors?: FieldErrors<FormData>;
  schema: yup.AnyObjectSchema;
  clearErrors?: () => void;
}

type Tests = { name: string; params: Record<string, unknown> }[];

interface Return<FormData extends ObjectType> {
  required: (name: string) => boolean;
  error: (name: string) => boolean;
  errorMessage: (name: string) => string | undefined;
  errorDetail: (name: string) => FieldErrors<FormData>[string];
}

export const useFormUtils = <FormData extends ObjectType>({
  errors,
  schema,
  clearErrors,
}: Props<FormData>): Return<FormData> => {
  useEffect(() => {
    clearErrors && clearErrors();
  }, []);

  useEffect(() => {
    !isEmpty(errors) && scrollIntoError();
  }, [errors]);

  const scrollIntoError = () => {
    const formItemErrors = document.getElementsByClassName(
      "scroll-error-anchor",
    );

    formItemErrors.length &&
      formItemErrors[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  const errorDetail: Return<FormData>["errorDetail"] = (name) =>
    errors && errors[name];

  const errorMessage: Return<FormData>["errorMessage"] = (name) => {
    const message = errors && errors[name]?.message;

    return isString(message) ? message : undefined;
  };

  const error: Return<FormData>["error"] = (name) =>
    !!(errors && get(errors, name, false));

  const required = (name: string) => {
    const describe = schema.describe();

    const describePath = [];

    name.split(".").forEach((fieldName) => {
      describePath.push("fields");
      describePath.push(fieldName);
    });

    describePath.push("tests");

    const tests: Tests = get(describe, describePath, []);

    return tests.some((test) => test.name === "required");
  };

  return {
    error,
    errorMessage,
    errorDetail,
    required,
  };
};
