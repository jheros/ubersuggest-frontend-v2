import i18n from 'i18next'
import moment from 'moment'

import { getLanguageCode } from './translation'

export const getDateFormat = (type = 'YYYY-MM-DD') => {
  const languageCode = getLanguageCode()
  const formats: { [key: string]: { [key: string]: string } } = {
    'YYYY-MM-DD': {
      en: 'MM/DD/YYYY',
      pt: 'DD/MM/YYYY',
      de: 'DD-MM-YYYY',
      es: 'DD-MM-YYYY',
      fr: 'DD/MM/YYYY',
      nl: 'DD-MM-YYYY',
      it: 'DD/MM/YYYY',
      ja: 'YYYY年MM月DD日',
      zh: 'YYYY年M月D日',
      default: 'YYYY-MM-DD',
    },
    'YY-MM': {
      en: 'YY/MM',
      pt: 'MM/YY',
      de: 'MM/YY',
      es: 'MM/YY',
      fr: 'MM/YY',
      nl: 'MM/YY',
      it: 'MM/YY',
      ja: 'YY年MM月',
      zh: 'YY年M月',
      default: 'YY/MM',
    },
    'MM-DD': {
      en: 'MM/DD',
      pt: 'DD/MM',
      de: 'DD-MM',
      es: 'DD-MM',
      fr: 'DD/MM',
      nl: 'DD-MM',
      it: 'DD/MM',
      ja: 'MM月DD日',
      zh: 'M月D日',
      default: 'MM-DD',
    },
  }
  return formats[type][languageCode]
}

export const formatDate = (date: Date | number, readFormat = 'YYYY-MM-DD', outputFormat: string = getDateFormat()) => {
  let dateObj
  if (readFormat === 'timestamp') {
    dateObj = moment(date)
  } else {
    dateObj = moment(date, readFormat)
  }

  if (outputFormat === 'MMM YYYY') {
    return `${i18n.t(dateObj.format('MMM').toLowerCase()).toUpperCase()} ${dateObj.format('YYYY')}`
  } else if (outputFormat === 'MMMM YYYY') {
    return `${i18n.t(dateObj.format('MMMM').toLowerCase()).toUpperCase()} ${dateObj.format('YYYY')}`
  } else if (outputFormat === 'MMM DD') {
    return `${i18n.t(dateObj.format('MMM').toLowerCase()).toUpperCase()} ${dateObj.format('DD')}`
  } else if (outputFormat === 'MMM DD, YYYY') {
    return `${i18n.t(dateObj.format('MMM').toLowerCase()).toUpperCase()} ${dateObj.format('DD')}, ${dateObj.format(
      'YYYY',
    )}`
  } else if (outputFormat === 'MMM DD YYYY') {
    return `${i18n.t(dateObj.format('MMM').toLowerCase()).toUpperCase()} ${dateObj.format('DD')} ${dateObj.format(
      'YYYY',
    )}`
  } else if (outputFormat === 'MMMM DD, YYYY') {
    return `${i18n.t(dateObj.format('MMMM').toLowerCase())} ${dateObj.format('DD')}, ${dateObj.format('YYYY')}`
  } else if (outputFormat === 'MMMM') {
    return `${i18n.t(dateObj.format('MMMM').toLowerCase())}`
  } else if (outputFormat === 'LLL') {
    return `${i18n.t(dateObj.format('MMMM').toLowerCase())} ${dateObj.format('DD')}, ${dateObj.format(
      'YYYY',
    )} ${dateObj.format('HH:mm A')}`
  } else {
    return dateObj.format(outputFormat)
  }
}
