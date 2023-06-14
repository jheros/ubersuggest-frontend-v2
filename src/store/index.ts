import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { userApi, authApi } from './api'
import { authReducer, recaptchaReducer } from './reducers'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recaptcha: recaptchaReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, userApi.middleware]),
})

setupListeners(store.dispatch)

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>
export type IAppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>
