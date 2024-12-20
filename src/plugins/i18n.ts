import { App, reactive } from "vue";
import { translations, Languages } from "../translations/index";

// Função para acessar valores aninhados usando dot notation
function getNestedValue(obj: any, path: string): string | null {
  return path.split(".").reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : null;
  }, obj);
}

export default {
  install(app: App, defaultLanguage: Languages = "en") {
    const state = reactive({
      lang: defaultLanguage,
      translations: translations[defaultLanguage],
    });

    function translate(key: string): string {
      const value = getNestedValue(state.translations, key);
      return value || key; 
    }

    app.config.globalProperties.$translate = translate;
    app.config.globalProperties.$setLanguage = (lang: Languages) => {
      if (translations[lang]) {
        state.lang = lang;
        state.translations = translations[lang];
      } else {
        console.warn(`Language '${lang}' is not supported.`);
      }
    };

    // Expor para uso em componentes de script setup
    app.provide("i18n", {
      translate,
      setLanguage: app.config.globalProperties.$setLanguage,
      currentLanguage: () => state.lang,
    });
  },
};
