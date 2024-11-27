import React from "react";
import styled from "styled-components";
import { Row, RadioAntd } from "./index.js";
import { ComponentContainer } from "./component-container";

export const RadioGroup = ({
  required,
  error,
  label,
  options = [],
  variant = "outlined",
  children,
  helperText,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      required={required}
      error={error}
      label={label}
      animation={true}
      helperText={helperText}
    >
      <Row {...props}>
        <RadioGroupStyled {...props}>
          {!children
            ? options.map((data, index) => (
                <RadioAntd key={index} value={data.value} id={data.label}>
                  {data.label}
                </RadioAntd>
              ))
            : children}
        </RadioGroupStyled>
      </Row>
    </Container>
  );
};

const RadioGroupStyled = styled(RadioAntd.Group)`
  padding: 10px;
`;
