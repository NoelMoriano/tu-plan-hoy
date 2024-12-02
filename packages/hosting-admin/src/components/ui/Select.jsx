import React, { useState } from "react";
import { SelectAntd } from "./index.js";
import { ComponentContainer } from "./component-container";
import { lighten } from "polished";
import styled, { css } from "styled-components";
import { cloneDeep, isString } from "lodash";

const defaultFilterOption = (inputValue, optionLabel) => {
  const labelParts = optionLabel.toLowerCase().split(" - ");
  return labelParts.some((part) => part.includes(inputValue.toLowerCase()));
};

export const Select = ({
  value = undefined,
  required = false,
  error = false,
  disabled = false,
  animation,
  isMobile = false,
  label,
  children,
  variant = "filled",
  allowClear,
  filterOption = (inputValue, optionLabel) =>
    defaultFilterOption(inputValue, optionLabel),
  options = [],
  placeholder = "",
  onChange = (value) => value,
  autoFocus,
  mode,
  ...props
}) => {
  const [search, setSearch] = useState("");

  const Container = ComponentContainer[variant];

  const fixValue = value ? value : undefined;

  const selectFilterOption = (inputValue, option) =>
    option && isString(option.label)
      ? filterOption(inputValue, option.label)
      : true;

  const filterOptions = cloneDeep(options)
    ?.filter((option) => (search ? filterOption(search, option.label) : true))
    .filter((option) => (option.label ? option.label : true));

  return (
    <Container
      required={required}
      value={fixValue}
      error={error}
      disabled={disabled}
      label={label}
      animation={animation}
    >
      {isMobile ? (
        <StyledSelectMobile
          key={fixValue}
          disabled={disabled}
          error={error}
          onChange={(event) => onChange && onChange(event.target.value)}
          value={fixValue}
          defaultValue={fixValue}
          placeholder={placeholder}
        >
          {placeholder && <option hidden>{placeholder}</option>}
          {!fixValue && <option hidden />}
          {options.map((option) => (
            <option key={option.code} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelectMobile>
      ) : (
        <SelectAntd
          mode={mode}
          allowClear={disabled ? false : allowClear}
          variant="borderless"
          disabled={disabled}
          value={fixValue}
          onChange={onChange}
          onBlur={() => setSearch("")}
          onSelect={() => setSearch("")}
          onDeselect={() => setSearch("")}
          onFocus={() => setSearch("")}
          filterOption={selectFilterOption}
          showSearch
          size="large"
          options={filterOptions}
          onSearch={setSearch}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="chrome-off"
          {...props}
        />
      )}
    </Container>
  );
};

const StyledSelectMobile = styled.select`
  ${({ theme, error, value, placeholder }) => css`
    width: 100%;
    height: 32px;
    border: none;
    margin: 0 11px 4px 11px;
    font-size: 1rem;
    background-color: ${error
      ? lighten(0.4, theme.colors.error)
      : "transparent"};
    cursor: text;
    border-radius: ${theme.border_radius.xx_small};
    color: ${placeholder && !value ? theme.colors.heading : theme.colors.body};
    font-weight: ${theme.font_weight.medium};

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#6D8BA1'><polygon points='0,0 100,0 50,50'/></svg>");
    background-repeat: no-repeat;
    background-size: 10px;
    background-position: right center;

    &:focus-within {
      background: ${theme.colors.white};
      outline: none;
    }
  `}
`;
