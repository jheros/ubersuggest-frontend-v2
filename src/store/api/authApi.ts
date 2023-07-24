import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import type { ILoginInput } from 'components'
import { IRootState } from 'store'
import { setToken } from 'store/reducers/auth'
import { setReportLimits } from 'store/reducers/user'

import {
  IGenericResponse,
  IRegisterUserInput,
  IRegisterMultiUsersInput,
  IGetTokenRes,
  ILoginRes,
  IResendVerificationEmailInput,
  IResetPasswordInput,
  IChangePasswordInput,
  IReportLimits,
} from '../types'

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
        _extraOptions,
        fetchWithBQ,
      ) {
        try {
          const { error } = await fetchWithBQ({
            url: 'user/signup',
            method: 'POST',
            credentials: 'include',
            body: {
              email,
              password,
              lang,
              recurly_coupon,
              country,
              city,
            },
          })
          if (error) return { error }
          const recaptchaToken = (getState() as IRootState).recaptcha.token as string
          await dispatch(authApi.endpoints.getToken.initiate(recaptchaToken)).unwrap()
          return { data: {} as IGenericResponse }
        } catch (err) {
          return { error: err as FetchBaseQueryError }
        }
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
      async queryFn({ rememberMe, ...requestBody }: ILoginInput, { dispatch, getState }, extraOptions, fetchWithBQ) {
        try {
          const { data, error } = await fetchWithBQ({
            url: 'user/login',
            method: 'POST',
            body: requestBody,
            credentials: 'include',
            params: { remember_me: rememberMe },
          })
          if (error) return { error }
          const recaptchaToken = (getState() as IRootState).recaptcha.token as string
          await dispatch(authApi.endpoints.getToken.initiate(recaptchaToken)).unwrap()
          return { data: data as ILoginRes }
        } catch (err) {
          return { error: err as FetchBaseQueryError }
        }
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
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { token, ttl, ...reportLimits },
          } = await queryFulfilled
          dispatch(setToken({ token, token_ttl: ttl }))
          dispatch(setReportLimits(reportLimits as IReportLimits))
        } catch (err) {
          // * we don't need to handle err here
        }
      },
    }),
    resendVerificationEmail: builder.mutation<IGenericResponse, IResendVerificationEmailInput>({
      query(body) {
        return {
          url: 'user/resend_verification_email',
          method: 'POST',
          body,
        }
      },
    }),
    resetPassword: builder.query<IGenericResponse, IResetPasswordInput>({
      query({ email, lang }) {
        return {
          url: 'user/forgot-password',
          params: { email, lang },
        }
      },
    }),
    changePassword: builder.mutation<IGenericResponse, IChangePasswordInput>({
      query(body) {
        return {
          url: 'user/reset-password',
          method: 'POST',
          body,
        }
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
  useResendVerificationEmailMutation,
  useResetPasswordQuery,
  useLazyResetPasswordQuery,
  useChangePasswordMutation,
} = authApi
