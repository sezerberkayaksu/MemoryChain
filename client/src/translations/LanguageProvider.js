import React, { Suspense } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationTr from "./tr.json";
import translationEn from "./en.json";

export const LANGUAGES = ["tr", "en"];

const LanguageProvider = ({ children }) => {
  i18n.use(initReactI18next).init({
    resources: {
      tr: { translation: translationTr },
      en: { translation: translationEn }
    },
    lng: "tr",
    interpolation: { escapeValue: false }
  });

  return <Suspense fallback="Loading...">{children}</Suspense>;
};

export default LanguageProvider;
