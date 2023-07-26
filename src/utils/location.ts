import { UNSUPPORTED_CURRENCIES } from 'configs/currency'
import CONFIG_LOC_LANGS from 'constants/configLocLangs.json'
import COUNTRIES from 'constants/countriesConfig.json'
import CURRENCIES from 'constants/currencies.json'
import LANGUAGES from 'constants/languages.json'
import LOCALES from 'constants/locales.json'
import LOCATIONS from 'constants/locations.json'
import i18n from 'i18next'
import { get, memoize, filter, sortBy, findKey } from 'lodash'

type ILanguageKey = keyof typeof LANGUAGES
type ICountryKey = keyof typeof COUNTRIES
type ILocationKey = keyof typeof LOCATIONS
type ILocaleKey = keyof typeof LOCALES
type ILocation = {
  id: number | string
  parentId: null | number
  name: string
  type: string
  countryIsoCode: string
  canonicalName: string
}
type ILanguage = {
  code: string
  name: string
}
interface ILangLoc extends ILocation {
  text: string
  languageName?: string
  languageCode: string
}

interface ICurrency {
  currency: string
  position?: string
}

interface INumbro {
  languageTag: string
  delimiters: {
    thousands: string
    decimal: string
  }
  currency: {
    symbol: string
    code: string
    position: string
  }
  abbreviations: {
    thousand: string
    million: string
    billion: string
    trillion: string
  }
  ordinal: () => string
}

interface ILangLocCombinations {
  [key: string]: ILangLoc
}

interface INumbroCountries {
  [key: string]: INumbro
}

export interface IRegion {
  lang: string
  locId: ILocationKey
}

export type ICountryCode = keyof typeof CURRENCIES

export const { DEFAULT_BAN_COUNTRIES, DFS_NOT_AVAILABLE_LOC_LANGS, DEFAULT_BAN_LANGS, COMPETITOR_LOC_LANGS } =
  CONFIG_LOC_LANGS

export const DEFAULT_TOP_5_COUNTRIES = ['en/US', 'en/GB', 'ja/JP', 'en/AU', 'en/CA']

export const ALL_LOCATIONS_OPTION = {
  id: '0000',
  name: 'All Locations',
  parentId: null,
  type: 'All',
  text: i18n.t('all_locations'),
  languageCode: 'WW',
  countryIsoCode: 'WW',
  canonicalName: i18n.t('all_locations'),
}

export const isLanguageBanned = (lang: string, banList: string[]) => {
  if (!banList) return false
  return banList.some((item) => item === lang)
}

export const getAllLangLocCombinations = memoize(() => {
  const locs: ILangLocCombinations = {}
  Object.values(LOCATIONS).forEach((location: ILocation) => {
    if (location.countryIsoCode in LANGUAGES && !DEFAULT_BAN_COUNTRIES.some((c) => c === `${location.id}`)) {
      const locationLanguages = LANGUAGES[location.countryIsoCode as ILanguageKey]
      locationLanguages.forEach((language: ILanguage) => {
        if (DEFAULT_BAN_LANGS.some((l) => l === language.code)) return

        locs[`${language.code}_${location.id}`] = {
          text:
            location.type === 'Country'
              ? `${language.name} / ${location.name}`
              : `${language.name} / ${location.canonicalName}`,
          languageName: language.name,
          languageCode: language.code,
          ...location,
        }
      })
    }
  })
  return locs
})

export const getLocations = memoize(
  (allowCities, banLocLangs = {}, enableAllLocations = false) => {
    const locations: ILangLocCombinations = getAllLangLocCombinations()
    let filteredOptions
    if (allowCities) {
      filteredOptions = filter(locations, (c) => !isLanguageBanned(c.languageCode, get(banLocLangs, `${c.id}`)))
    } else {
      filteredOptions = filter(
        locations,
        (l) => l.type === 'Country' && !isLanguageBanned(l.languageCode, get(banLocLangs, `${l.id}`)),
      )
    }

    filteredOptions = sortBy(filteredOptions, [
      (l) => (l.type === 'Country' ? 0 : 1),
      (l) => (`${l.languageCode}/${l.countryIsoCode}` === DEFAULT_TOP_5_COUNTRIES[0] ? 0 : 1),
      (l) => (`${l.languageCode}/${l.countryIsoCode}` === DEFAULT_TOP_5_COUNTRIES[1] ? 0 : 1),
      (l) => (`${l.languageCode}/${l.countryIsoCode}` === DEFAULT_TOP_5_COUNTRIES[2] ? 0 : 1),
      (l) => (`${l.languageCode}/${l.countryIsoCode}` === DEFAULT_TOP_5_COUNTRIES[3] ? 0 : 1),
      (l) => (`${l.languageCode}/${l.countryIsoCode}` === DEFAULT_TOP_5_COUNTRIES[4] ? 0 : 1),
      'name',
      'languageName',
    ])
    if (enableAllLocations) {
      filteredOptions.unshift(ALL_LOCATIONS_OPTION as ILangLoc)
    }
    return filteredOptions
  },
  (...args) => JSON.stringify(args),
)

export const getCountryInfo = memoize(
  (countryCode) => {
    const country =
      Object.values(LOCATIONS).find((item) => item.countryIsoCode.toLowerCase() === countryCode.toLowerCase()) ||
      LOCATIONS[2840] // use US as default
    const languageCode = get(LOCATIONS, [countryCode.toUpperCase(), 0, 'code'], 'en') // use English as default

    return {
      ...country,
      locationId: country.id,
      languageCode,
    }
  },
  (...args) => JSON.stringify(args),
)

export const isCurrencySupported = memoize(
  (currency) => currency && !UNSUPPORTED_CURRENCIES.some((c) => c === currency),
  (currency) => currency,
)

export const getSupportedCurrency = memoize(
  (currency = 'USD') => (isCurrencySupported(currency) ? currency : 'USD'),
  (currency) => currency,
)

export const getCurrencyAndRegion = memoize(
  (countryCode: ICountryCode) => {
    const currency = CURRENCIES[countryCode]?.currency
    if (!isCurrencySupported(currency)) {
      return {
        currency: 'USD',
        region: { lang: 'en', locId: '2840' as ILocationKey },
        planCode: 'other', // todo: deprecated. remove later
        isCurrencySupported: false,
      }
    } else {
      const { languageCode, locationId } = getCountryInfo(countryCode)
      return {
        currency,
        region: { lang: languageCode, locId: locationId.toString() as ILocationKey },
        planCode: currency.toLowerCase(), // todo: deprecated. remove later
        isCurrencySupported: true,
      }
    }
  },
  (countryCode) => countryCode,
)

export const getRegionFromCurrency = (currency: string) => {
  const countryCode = findKey(CURRENCIES, (o) => o.currency === currency.toUpperCase()) || 'US'
  const { region } = getCurrencyAndRegion(countryCode as ICountryCode)
  return region
}

export const getCountryIsoCode = (locId: ILocationKey) => {
  const country = LOCATIONS[locId as ILocationKey]
  return country ? country.countryIsoCode : 'US'
}

export const getLocale = (lang: string, locId: ILocationKey) => {
  const isoCode = getCountryIsoCode(locId)
  const countryInfo = COUNTRIES[isoCode.toLowerCase() as ICountryKey]

  const defaultCountryLocale = {
    currency: countryInfo.currency,
    decimalSeparator: countryInfo.decimalSeparator,
    thousandSeparator: countryInfo.thousandSeparator,
  }
  return LOCALES[getLanguageCode(lang, locId)] || defaultCountryLocale
}

export const getLanguageCode = (lang: string, locId: ILocationKey): ILocaleKey => {
  return `${lang.slice(0, 2)}-${getCountryIsoCode(locId)}` as ILocaleKey
}

export const getNewLangs = memoize(() => {
  const numbroCountries: INumbroCountries = {}

  Object.values(COUNTRIES).forEach((countryInfo) => {
    const locId = countryInfo.locationId as ILocationKey
    const countryIsoCode = getCountryIsoCode(locId)

    if (countryIsoCode in LANGUAGES) {
      const locationLanguages = LANGUAGES[countryIsoCode as ILanguageKey]
      locationLanguages.forEach((language) => {
        const languageTag = getLanguageCode(language.code, locId)
        const locale = getLocale(language.code, locId)
        const currency = CURRENCIES[countryIsoCode as ICountryCode] as ICurrency

        numbroCountries[`${languageTag}`] = {
          languageTag,
          delimiters: {
            thousands: locale?.thousandSeparator,
            decimal: locale?.decimalSeparator,
          },
          currency: {
            symbol: locale?.currency,
            code: currency?.currency || '',
            position: currency?.position || 'prefix',
          },
          abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't',
          },
          ordinal: function () {
            return '.'
          },
        }
      })
    }
  })

  return numbroCountries
})
