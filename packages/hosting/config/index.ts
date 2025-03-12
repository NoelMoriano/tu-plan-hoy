import { includes } from "lodash";
import { config } from "@/config/config";

const hostName = "tuplanhoy.com";

const hostsProduction = ["tuplanhoy.com"];

export const currentEnvironment = includes(hostsProduction, hostName)
  ? "production"
  : "development";

export const isProduction = currentEnvironment === "production";
export const currentConfig = config[currentEnvironment];

console.log("currentEnvironment: ", currentEnvironment);
