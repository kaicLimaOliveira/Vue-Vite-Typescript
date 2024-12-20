import { Languages } from "../translations/index";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $translate: (key: string) => string;
    $setLanguage: (lang: Languages) => void;
  }
}