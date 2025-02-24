import { capitalize } from "lodash";
import { User } from "../globalTypes";

export const uniq = (strings: string[]): string[] =>
  strings.map((string) =>
    string
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
  );

export const getFullName = (
  user: User | undefined,
  direction = "obverse"
): string =>
  direction === "obverse"
    ? `${capitalize(user?.firstName)} ${capitalize(
        user?.paternalSurname
      )} ${capitalize(user?.maternalSurname)}`
    : direction === "reverse"
    ? `${capitalize(user?.paternalSurname)} ${capitalize(
        user?.maternalSurname
      )} ${capitalize(user?.firstName)}`
    : "";

export const getResponseType = (reponseType: string) =>
  reponseType === "positive" ? "Positivo" : "Negativo";
