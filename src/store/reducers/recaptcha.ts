import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isPaidUserSelector } from './auth'
import { IRootState } from 'store'

interface IRecaptchaState {
  token: string | null
  isLoaded: boolean
  executeCounter: number
}

const initialState = {
  token: null,
  isLoaded: false,
  executeCounter: 0,
} as IRecaptchaState

const recaptchaSlice = createSlice({
  name: 'recaptcha',
  initialState,
  reducers: {
    changeToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    setScriptLoaded: (state) => {
      state.isLoaded = true
    },
    executeRecaptcha: (state) => {
      state.executeCounter = state.executeCounter + 1
    },
  },
})

export const enableRecaptchaSelector = (state: IRootState): boolean => {
  return !isPaidUserSelector(state) && process.env.REACT_APP_DISABLE_RECAPTCHA !== 'true'
}

export const { changeToken, setScriptLoaded } = recaptchaSlice.actions

export default recaptchaSlice.reducer
