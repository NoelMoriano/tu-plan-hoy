import { css, createGlobalStyle } from "styled-components";
import { mediaQuery } from "../constants";
import { darken } from "polished";

const global = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #e9eef6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${({ theme }) => theme.colors.font2};
  }

  h1,
  h2,
  h3 {
    color: ${({ theme }) => theme.colors.font1};
  }

  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.font2};
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 3.4rem;
  }

  h2 {
    font-size: 1.7rem;
    font-weight: 600;
    line-height: 2.2rem;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
  }

  .link-color {
    color: rgba(49, 138, 255, 0.93);
    cursor: pointer;
  }

  .d-flex {
    display: flex;
  }

  .pointer {
    cursor: pointer;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .center {
    text-align: center;
  }
`;

export const scrollStyle = {
  behavior: "smooth",
  block: "center",
  top: "10px",
};

const antd = {};

const scroll = css`
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: darkgrey;
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${global}
  ${Object.values(antd).map((antdComponent) => antdComponent)}
  ${mediaQuery.minTablet}{
    ${scroll}
  }
`;
