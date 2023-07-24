import PHONE_CODES from 'constants/phoneCodes.json'
import i18next from 'i18next'
import libParsePhone, { CountryCode } from 'libphonenumber-js'
import { memoize, sortBy } from 'lodash'

export const getPhoneCodes = memoize(() => {
  return sortBy(
    PHONE_CODES.map((item) => ({
      countryCode: item.code || '',
      countryName: i18next.t(item.name) || '',
      dialCode: item.dial_code || '',
    })),
    (item) => `${item.countryName} ${item.dialCode}`,
  )
})

export const getPhoneCodeFromCountryCode = (countryCode: string) => {
  return PHONE_CODES.find((option) => option.code === countryCode)?.dial_code
}

export const parsePhoneNumber = (phoneNumber: string, countryCode: CountryCode) => {
  let phone
  if ((phone = libParsePhone(phoneNumber || ''))) {
    return [`+${phone.countryCallingCode}`, phone.nationalNumber]
  } else if ((phone = libParsePhone(phoneNumber || '', countryCode))) {
    return [`+${phone.countryCallingCode}`, phone.nationalNumber]
  } else {
    return [getPhoneCodeFromCountryCode(countryCode), phoneNumber]
  }
}
