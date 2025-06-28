import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, // ✅ see logs in browser console
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
  });

export default i18n;
