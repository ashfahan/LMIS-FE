import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
// import Translate from '../public/translate';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['sessionStorage', 'htmlTag', 'cookie', 'navigator'],
      cache: ['sessionStorage'],
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
