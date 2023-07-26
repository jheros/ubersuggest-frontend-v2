import numbro from 'numbro'
import numbroLangs from 'numbro/dist/languages.min'
import { IRegion, getLanguageCode, getNewLangs } from 'utils/location'

Object.values(getNewLangs()).forEach((numbroCountry) => {
  const fromNumbro = numbroLangs[numbroCountry.languageTag] || numbroLangs[numbroCountry.languageTag.slice(0, 2)] || {}
  const merged = {
    ...fromNumbro,
    ...numbroCountry,
  }

  numbro.registerLanguage(merged)
})

export const localizeNumbro = ({ lang, locId }: IRegion) => {
  const locale = getLanguageCode(lang, locId)
  numbro.setLanguage(locale)
}

export interface IFormatNumberOptions {
  withCurrency?: boolean
  decimalCounts?: number
  useAbbreviation?: boolean
  abbrUnit?: number
  region?: IRegion
}

export const formatNumber = (
  x: number,
  {
    withCurrency = false,
    decimalCounts = 2,
    useAbbreviation = true,
    abbrUnit = 1000000,
    region = { lang: 'en', locId: '2840' },
  }: IFormatNumberOptions = {},
) => {
  localizeNumbro(region)
  const format = {
    thousandSeparated: true,
    mantissa: withCurrency ? (x % 1 === 0 ? 0 : decimalCounts) : useAbbreviation && x >= abbrUnit ? 1 : 0,
    average: useAbbreviation && x >= abbrUnit,
  }
  return withCurrency ? numbro(x).formatCurrency(format) : numbro(x).format(format)
}
