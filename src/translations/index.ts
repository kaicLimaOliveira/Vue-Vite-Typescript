import en from "./locales/en-US.json";
import pt from "./locales/pt-BR.json";

export const translations = {
  en,
  pt,
};

export type Languages = keyof typeof translations;