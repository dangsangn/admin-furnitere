import i18next, { i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { defaultLang } from '../../config';
import enLocales from './en';
import vnLocales from './vn';

// ----------------------------------------------------------------------

export const resources = {
  en: { translations: enLocales },
  vn: { translations: vnLocales },
};
export const defaultNS = 'translations';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || defaultLang.value,
    fallbackLng: defaultLang.value || 'vn',
    debug: false,
    ns: ['translations'],
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
