import React from "react";
import { InputAntd } from "./index.js";
import { ComponentContainer } from "./component-container";

export const Input = ({
  value,
  required = false,
  hidden = false,
  error,
  label,
  variant = "filled",
  disabled,
  animation,
  helperText,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      hidden={hidden}
      error={error}
      label={label}
      disabled={disabled}
      helperText={helperText}
      animation={animation}
    >
      <InputAntd
        variant="borderless"
        size="large"
        placeholder=""
        value={value}
        disabled={disabled}
        allowClear={!disabled}
        {...props}
      />
    </Container>
  );
};
