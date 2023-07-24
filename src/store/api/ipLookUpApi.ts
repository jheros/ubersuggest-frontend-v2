import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { DEFAULT_BAN_COUNTRIES, getCountryInfo } from 'utils/location'

// todo: move this to config
const IP_API_KEY = process.env.REACT_APP_IP_API_KEY || 'chjtnjQB8SbJ67z'

export const fetchIp = async () => {
  try {
    // * comment out https check as http request keep failing
    // if (window.location.protocol === 'https:') {
      return await axios({
        method: 'get',
        url: 'https://pro.ip-api.com/json',
        params: { key: IP_API_KEY },
      })
    // } else {
    //   return await axios({
    //     method: 'get',
    //     url: 'http://ip-api.com/json',
    //   })
    // }
  } catch (err) {
    console.error(err)
    return null
  }
}

// todo: cache
export const lookUpIP = createAsyncThunk('ipLookUpApi/lookUpIP', async () => {
  const { data } = (await fetchIp()) || {}
  const countryCode = data
    ? !DEFAULT_BAN_COUNTRIES.some((v) => v === data.countryCode)
      ? data.countryCode
      : 'US'
    : 'US'
  const { country, city } = data || {}
  const ipLocation = getCountryInfo(countryCode)
  const preferences = ipLocation
    ? { lang: ipLocation.languageCode, locId: ipLocation.locationId }
    : { lang: 'en', locId: 2840 }
  return {
    countryCode,
    country,
    city,
    preferences,
  }
})
