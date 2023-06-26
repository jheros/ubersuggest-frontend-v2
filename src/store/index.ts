import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { userApi, authApi, planApi } from './api'
import { adBlockerReducer, authReducer, modalReducer, recaptchaReducer, planReducer } from './reducers'

export const store = configureStore({
  reducer: {
    adBlocker: adBlockerReducer,
    auth: authReducer,
    modal: modalReducer,
    recaptcha: recaptchaReducer,
    plan: planReducer,
    [authApi.reducerPath]: authApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, planApi.middleware, userApi.middleware]),
})

setupListeners(store.dispatch)

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>
export type IAppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>
