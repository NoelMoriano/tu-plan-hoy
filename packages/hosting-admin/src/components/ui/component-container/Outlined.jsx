import React from "react";
import styled, { css } from "styled-components";
import { capitalize, isEmpty, startCase, toString } from "lodash";
import { classNames, keyframes } from "../../../styles";
import { Typography } from "antd";
import { lighten, tint } from "polished";

const { Text } = Typography;

export const Outlined = ({
  value,
  required,
  error,
  hidden = false,
  label,
  children,
  componentId,
  animation,
  helperText,
  disabled = false,
}) => (
  <>
    <Container
      value={typeof value === "object" ? !isEmpty(value) : !!toString(value)}
      error={error}
      required={required}
      hidden={hidden}
      animation={animation}
      className={classNames({ "scroll-error-anchor": error })}
      disabled={disabled}
    >
      <div className="item-wrapper">{children}</div>
      <label htmlFor={componentId} className="item-label">
        {label}
      </label>
    </Container>
    {helperText && (
      <Error error={error}>{capitalize(startCase(helperText))}</Error>
    )}
  </>
);

const labelAnimate = css`
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.border_radius.xx_small};
  top: -11px;
  left: 6px;
  bottom: auto;
  font-weight: 600;
  font-size: ${({ theme }) => theme.font_sizes.x_small};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Container = styled.div`
  ${({ theme, error, required, disabled, value, animation, hidden }) => css`
    position: relative;
    width: inherit;
    border-radius: ${theme.border_radius.small};
    background: ${theme.colors.white};
    border: 1px solid ${error ? theme.colors.error : theme.colors.gray};
    animation: ${error && keyframes.shake} 340ms
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

    &:hover,
    &:focus-within {
      border-color: ${
        error
          ? theme.colors.error
          : disabled
          ? theme.bg.border
          : lighten(0.1, theme.colors.primary)
      };}

    .item-label,
    .item-label:after {
      color: ${
        error
          ? theme.colors.error
          : disabled
          ? theme.color.body
          : lighten(0.1, theme.colors.primary)
      };
    }
  }

  &:focus-within {
    ${
      error
        ? css`
            border-color: ${theme.colors.error};
            box-shadow: 0 0 0 2px ${tint(0.85, theme.colors.error)};
          `
        : css`
            border-color: ${lighten(0.1, theme.colors.primary)};
            box-shadow: 0 0 0 2px ${tint(0.85, theme.colors.primary)};
          `
    }
  }

    .item-label {
      position: absolute;
      top: 0;
      left: 10px;
      bottom: 0;
      z-index: 100;
      pointer-events: none;
      display: flex;
      align-items: center;
      background-color: transparent;
      color: ${error ? theme.colors.error : theme.colors.body};
      font-size: ${theme.font_sizes.small};
      transition: all ease-in-out 150ms, opacity 150ms;

      ${
        hidden &&
        css`
          display: none;
        `
      }

      ${animation && labelAnimate};

      ${value && labelAnimate};

      ${
        required &&
        css`
          ::after {
            display: inline-block;
            margin-left: 0.2rem;
            color: ${error ? theme.colors.error : theme.colors.body};
            font-size: ${({ theme }) => theme.font_sizes.small};
            line-height: 1;
            content: "*";
          }
        `
      }
    }

    .item-wrapper {
      &:hover + .item-label,
      &:hover + .item-label:after {
        color: ${
          error
            ? theme.colors.error
            : disabled
            ? theme.colors.body
            : lighten(0.1, theme.colors.primary)
        };
      }

      &:focus-within + .item-label,
      &:-webkit-autofill + .item-label {
        ${labelAnimate};

        color: ${
          error ? theme.colors.error : lighten(0.1, theme.colors.primary)
        };

        ${
          error &&
          css`
            color: ${theme.colors.error};
          `
        }
        &:after {
          color: ${
            error ? theme.colors.error : lighten(0.1, theme.colors.primary)
          };
        }
      }

      input:-webkit-autofill {
        -webkit-text-fill-color: #fff;
        ${
          value &&
          css`
            -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
          `
        };

        &:focus {
          -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
        }
      }

      //Styles default
      .ant-input-number,
      .ant-picker,
      .ant-select {
        width: 100%;
        box-shadow: none;
        outline: none;
      }

      .ant-input-affix-wrapper,
      .ant-input {
        box-shadow: none;
      }

      .ant-input-group-addon {
        border: 0 solid #d9d9d9;
        border-left: 1px solid #d9d9d9;
      }
    }
  `}
`;

const Error = styled(Text)`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.font_sizes.x_small};
  ${({ error }) =>
    error &&
    css`
      animation: ${keyframes.shake} 340ms;
    `};
`;
