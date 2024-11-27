import React from "react";
import { TimePickerAntd } from "./index.js";
import { ComponentContainer } from "./component-container";

export const TimePicker = ({
  value,
  disabled,
  required,
  error,
  label,
  variant = "filled",
  helperText,
  animation,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      animation={animation}
      helperText={helperText}
    >
      <TimePickerAntd
        disabled={disabled}
        variant="borderless"
        size="large"
        placeholder=""
        value={value}
        {...props}
      />
    </Container>
  );
};
