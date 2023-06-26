import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import { getLanguageCode } from 'utils/translation'

import deCountry from './country.de.json'
import esCountry from './country.es.json'
import frCountry from './country.fr.json'
import itCountry from './country.it.json'
import jaCountry from './country.ja.json'
import nlCountry from './country.nl.json'
import ptCountry from './country.pt.json'
import zhCountry from './country.zh.json'
import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'
import ja from './ja.json'
import nl from './nl.json'
import pt from './pt.json'
import zh from './zh.json'

const resources = {
  de: {
    translation: {
      ...de,
      ...deCountry,
    },
  },
  en: {
    translation: en,
  },
  es: {
    translation: {
      ...es,
      ...esCountry,
    },
  },
  fr: {
    translation: {
      ...fr,
      ...frCountry,
    },
  },
  it: {
    translation: {
      ...it,
      ...itCountry,
    },
  },
  ja: {
    translation: {
      ...ja,
      ...jaCountry,
    },
  },
  nl: {
    translation: {
      ...nl,
      ...nlCountry,
    },
  },
  pt: {
    translation: {
      ...pt,
      ...ptCountry,
    },
  },
  zh: {
    translation: {
      ...zh,
      ...zhCountry,
    },
  },
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguageCode(),
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
})

export default i18n
