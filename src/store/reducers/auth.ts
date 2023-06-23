import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { IRootState } from 'store'
import type { IUserToken, IUserInfo } from 'store/types'
import { TOKEN } from 'utils/constants/local-storage'

const userToken: IUserToken | null = JSON.parse(localStorage.getItem(TOKEN) || `null`)

interface IAuthState {
  userInfo: IUserInfo | null
  userToken: IUserToken | null
}

const initialState = {
  userInfo: null,
  userToken,
} as IAuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN)
      state.userInfo = null
      state.userToken = null
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload
    },
    setToken: (state, action: PayloadAction<IUserToken>) => {
      localStorage.setItem(TOKEN, JSON.stringify(action.payload))
      state.userToken = action.payload
    },
  },
})

export const isSignedInSelector = (state: IRootState) => {
  return !!state.auth.userToken
}

export const isUserInGracePeriodSelector = (state: IRootState) => {
  const { userInfo } = state.auth
  if (userInfo && userInfo.subscription) {
    const { pastDueStartedAt, subscriptionStatus } = userInfo.subscription
    if (subscriptionStatus === 'past_due') {
      const past = moment(pastDueStartedAt)
      const now = moment()
      if (now.diff(past, 'hours') < 48) return true
    }
  }
  return false
}

export const isPaidUserSelector = (state: IRootState) => {
  const { userInfo } = state.auth
  const subscriptionStatus = userInfo?.subscription?.subscriptionStatus as string
  return (
    isSignedInSelector(state) &&
    (['active', 'trialing', 'paid', 'canceled'].includes(subscriptionStatus) || isUserInGracePeriodSelector(state))
  )
}

export const userInfoSelector = (state: IRootState) => {
  return state.auth.userInfo
}

export const { logout, setUserInfo, setToken } = authSlice.actions

export default authSlice.reducer
