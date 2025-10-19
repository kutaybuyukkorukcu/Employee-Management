import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import { useAppStore } from "../store/store.js";

export async function initI18n() {
  const storedLanguage = useAppStore.getState().language;

  await i18next.use(HttpBackend).init({
    lng: storedLanguage,
    fallbackLng: "tr",
    backend: {
      loadPath: "/public/i18n/resources/{{lng}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return i18next;
}

export const i18n = initI18n();

export { i18next };
