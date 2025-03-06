import React from "react";
import styled from "styled-components";
import RadioAntd from "antd/lib/radio";
import { ComponentContainer } from "./component-container";

export const RadioGroup = ({
  required,
  error,
  label,
  options = [],
  onChange,
  animation = false,
  variant = "filled",
  helperText,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      required={required}
      error={error}
      label={label}
      animation={animation}
      helperText={helperText}
    >
      <RadioGroupStyled onChange={onChange} options={options} {...props} />
    </Container>
  );
};

const RadioGroupStyled = styled(RadioAntd.Group)`
  padding: 10px;
`;
