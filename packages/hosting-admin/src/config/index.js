import { includes } from "lodash";
import config from "./configs.json";

export { default as yup } from "./yup.json";

const hostName = window.location.hostname;

const hostsProduction = ["tuplanhoy.com"];

export const currentEnvironment = includes(hostsProduction, hostName)
  ? "production"
  : "development";

export const currentConfig = config[currentEnvironment];
