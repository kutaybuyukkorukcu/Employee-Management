import i18next from "i18next";
import HttpBackend from "i18next-http-backend";

export async function initI18n() {
  await i18next.use(HttpBackend).init({
    lng: "tr",
    fallbackLng: "tr",
    debug: false,
    backend: {
      loadPath: "/i18n/{{lng}}.json",
    },
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });

  return i18next;
}

export const i18n = initI18n();
