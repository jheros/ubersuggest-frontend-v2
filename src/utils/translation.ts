import { get } from 'lodash'

// Constants
import { LANGUAGE } from './constants/local-storage'

// Language codes aren't standarized
const supportedLangs = ['pt', 'es', 'de', 'it', 'fr', 'nl', 'ja', 'zh', 'en']
const legacyCodes = {
  jp: 'ja',
  cn: 'zh',
  br: 'pt',
}

export const fromLegacyCode = (code: string) => get(legacyCodes, code) || code

export const storeCurrLang = (langCode: string) => {
  localStorage.setItem(LANGUAGE, langCode)
}

export const getLanguageCode = (): string => {
  // Priority order:
  // 1. From current pathname
  // 2. From session Storage
  // 3. From navigator language
  // 4. Default 'en'
  const path = window.location.pathname.split('/')
  const fromPath = path.length > 1 ? path[1] : null
  const fromStorage = localStorage.getItem(LANGUAGE)
  const fromBrowser = navigator.language.split('-', 1)[0]
  const defaultLang = 'en'
  return [fromPath, fromStorage, fromBrowser, defaultLang]
    .map((lang) => fromLegacyCode(lang ?? ''))
    .find((lang) => supportedLangs.includes(lang))
}

export const pathWithNewLang = (lang: string) => {
  const { pathname, search } = window.location
  let newPathname
  const isHomePage = supportedLangs.includes(pathname.replaceAll('/', ''))
  if (isHomePage) {
    newPathname = `/${lang}`
  } else if (pathname.length > 1) {
    newPathname = pathname.replace(/^(\/en|\/pt|\/de|\/es|\/it|\/fr|\/nl|\/ja|\/zh|\/\*|)\/(.+)/, `/${lang}/$2`)
  } else {
    newPathname = `/${lang}`
  }
  return `${newPathname}${search}`
}
