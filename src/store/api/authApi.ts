import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import type { ILoginInput } from 'components'
import { IRootState } from 'store'
import { setToken } from 'store/reducers/auth'
import { IGenericResponse, IRegisterUserInput, IRegisterMultiUsersInput, IGetTokenRes, ILoginRes } from '../types'
import { userApi } from './userApi'

const disableRecaptcha = process.env.REACT_APP_DISABLE_RECAPTCHA === 'true'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, IRegisterUserInput>({
      async queryFn(
        {
          email,
          password,
          lang = 'en',
          recurly_coupon,
          country = 'United States',
          city = 'New York',
        }: IRegisterUserInput,
        { dispatch, getState },
        extraOptions,
        fetchWithBQ,
      ) {
        try {
          await fetchWithBQ({
            url: 'user/signup',
            method: 'POST',
            body: {
              email,
              password,
              lang,
              recurly_coupon,
              country,
              city,
            },
          })
          const recaptchaToken = (getState() as IRootState).recaptcha.token as string
          await dispatch(authApi.endpoints.getToken.initiate(recaptchaToken))
          return { data: {} as IGenericResponse }
        } catch (err) {
          return { error: err as FetchBaseQueryError }
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        await queryFulfilled
        await dispatch(userApi.endpoints.getMe.initiate(null))
      },
    }),
    registerMultiUsers: builder.mutation<IGenericResponse, IRegisterMultiUsersInput>({
      query({ code, password, lang = 'en', country = 'United States', city = 'New York' }) {
        return {
          url: 'mu/signup',
          method: 'POST',
          credentials: 'include',
          body: {
            code,
            password,
            lang,
            country,
            city,
          },
        }
      },
    }),
    loginUser: builder.mutation<ILoginRes, ILoginInput>({
      async queryFn({ rememberMe, ...data }: ILoginInput, { dispatch, getState }, extraOptions, fetchWithBQ) {
        try {
          const res = await fetchWithBQ({
            url: 'user/login',
            method: 'POST',
            body: data,
            credentials: 'include',
            params: { remember_me: rememberMe },
          })
          const recaptchaToken = (getState() as IRootState).recaptcha.token as string
          await dispatch(authApi.endpoints.getToken.initiate(recaptchaToken))
          return { data: res.data as ILoginRes }
        } catch (err) {
          return { error: err as FetchBaseQueryError }
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        await queryFulfilled
        await dispatch(userApi.endpoints.getMe.initiate(null))
      },
    }),
    getToken: builder.query<IGetTokenRes, string>({
      query(recaptchaToken) {
        return {
          url: 'get_token',
          credentials: 'include',
          params: disableRecaptcha ? { debug: 'app_norecaptcha' } : { recaptchaToken },
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const {
          data: { token, ttl },
        } = await queryFulfilled
        dispatch(setToken({ token, token_ttl: ttl }))
      },
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRegisterMultiUsersMutation,
  useGetTokenQuery,
  useLazyGetTokenQuery,
} = authApi
