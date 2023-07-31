import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from 'store'
import type { IUserToken } from 'store/types'
import { TOKEN } from 'utils/constants/local-storage'

const userToken: IUserToken | null = JSON.parse(localStorage.getItem(TOKEN) || `null`)

interface IAuthState {
  userToken: IUserToken | null
}

const initialState = {
  userToken,
} as IAuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN)
      state.userToken = null
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

export const isEmailVerificationRequiredSelector = createDraftSafeSelector(
  (state: IRootState) => isSignedInSelector(state),
  (state: IRootState) => state.user.userInfo.confirmed,
  (isSignedIn, confirmed) => isSignedIn && confirmed === false,
)

export const { logout, setToken } = authSlice.actions

export default authSlice.reducer
