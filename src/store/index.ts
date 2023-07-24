import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { addonApi, authApi, planApi, projectApi, userApi } from './api'
import {
  adBlockerReducer,
  addonReducer,
  authReducer,
  modalReducer,
  planReducer,
  projectReducer,
  recaptchaReducer,
  subUserReducer,
  userReducer,
} from './reducers'

export const store = configureStore({
  reducer: {
    adBlocker: adBlockerReducer,
    addon: addonReducer,
    auth: authReducer,
    modal: modalReducer,
    plan: planReducer,
    project: projectReducer,
    recaptcha: recaptchaReducer,
    subUser: subUserReducer,
    user: userReducer,
    [addonApi.reducerPath]: addonApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      addonApi.middleware,
      authApi.middleware,
      planApi.middleware,
      projectApi.middleware,
      userApi.middleware,
    ]),
})

setupListeners(store.dispatch)

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>
export type IAppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>
