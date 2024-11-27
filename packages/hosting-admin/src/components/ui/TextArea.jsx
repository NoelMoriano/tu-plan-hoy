import React from "react";
import { InputAntd } from "./index.js";
import { ComponentContainer } from "./component-container";

// interface Props {
//   value?: string | number;
//   required?: boolean;
//   error?: FormError;
//   label?: string;
//   variant?: "outlined" | "filled";
//   disabled?: boolean;
// }

export const TextArea = ({
  value,
  required,
  disabled,
  error,
  label,
  placeholder,
  variant = "filled",
  helperText,
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
      animation={false}
      helperText={helperText}
    >
      <InputAntd.TextArea
        variant="borderless"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    </Container>
  );
};
