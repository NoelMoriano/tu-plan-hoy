import React from "react";
import { DatePickerAntd } from "./index.js";
import { ComponentContainer } from "./component-container";
import dayjs from "dayjs";

export const DatePicker = ({
  value = undefined,
  name,
  required = false,
  disabled = false,
  hidden,
  error = false,
  helperText,
  dataTestId,
  label,
  variant = "filled",
  allowClear = true,
  onChange,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  value = value instanceof Date ? dayjs(value) : value;

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      hidden={hidden}
      error={error}
      label={label}
      helperText={helperText}
      dataTestId={dataTestId}
    >
      <DatePickerAntd
        size="large"
        format="DD/MM/YYYY"
        value={value}
        disabled={disabled}
        name={name}
        placeholder=""
        onChange={onChange}
        allowClear={allowClear}
        variant="borderless"
        {...props}
      />
    </Container>
  );
};
