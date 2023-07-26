import { useSelector } from 'react-redux'

import { userCountryCodeSelector } from 'store/reducers/user'
import { IFormatNumberOptions, formatNumber } from 'utils/numbro'

import { getCurrencyAndRegion } from '../utils/location'

export const useFormatNumber = () => {
  const countryCode = useSelector(userCountryCodeSelector)
  const { region } = getCurrencyAndRegion(countryCode)

  const format = (x: number, args: IFormatNumberOptions) => {
    return formatNumber(x, { ...args, region })
  }

  const formatCurrency = (x: number, args: IFormatNumberOptions = {}) => {
    return formatNumber(x, { region, withCurrency: true, useAbbreviation: false, ...args })
  }

  return { formatNumber: format, formatCurrency }
}
