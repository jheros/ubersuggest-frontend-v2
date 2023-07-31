import { createApi } from '@reduxjs/toolkit/query/react'
import { setInvoicingSettings, setReportLimits, setUserInfo } from 'store/reducers/user'
import { getPhoneCodeFromCountryCode } from 'utils/phoneNumber'
import { getLanguageCode } from 'utils/translation'

import type {
  IDailyReportLimits,
  IGenericResponse,
  IInvoicingSettings,
  IUpdateBillingInformationInput,
  IUpdatePaymentMethodInput,
  IUserInfo,
} from '../types'
import { baseQueryWithReauth } from '../utils'
import { planApi } from './planApi'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  // refetchOnFocus: true,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<IUserInfo, void>({
      query() {
        return {
          url: 'user',
          credentials: 'include',
        }
      },
      transformResponse: (res) => res as IUserInfo,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserInfo({ ...data, is_annonymous: !data }))
        } catch (err) {
          dispatch(setUserInfo({ is_annonymous: true } as IUserInfo))
        }
        // todo:
        // setAmplitudeUserId(userResponse.data.id)
        // setKissmetricsAliasing(userResponse.data.email)
        // getLocationsInfo([userPreferencesLocId])
        // identifyKissmetric(user)
        // identifyHubSpot(user)
        // updateHotJarSegment(user)
        // if (user.subscription) {
        //   kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.billing_status, {
        //     [PROPERTY_NAMES.billing_status]: user.subscription.subscriptionStatus,
        //   })
        // }
        // updateMetricsLimits(user.limits)
        // trackGTMEvent({
        //   event: 'authentication',
        //   login_user: user.isAnnonymous ? 'No' : 'Yes',
        // })
      },
    }),
    changeLoginMethodToEmail: builder.mutation<IGenericResponse, string>({
      query(password) {
        return {
          url: 'user/change-auth-system-to-email',
          credentials: 'include',
          method: 'POST',
          body: {
            password,
            password_repeat: password,
          },
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setUserInfo({ user_type: 'cognito' } as IUserInfo))
          // * deprecated old logic
          // await dispatch(userApi.endpoints.getMe.initiate()).unwrap()
        } catch (err) {
          // * no need to handle error
        }
      },
    }),
    removeMeFromAccount: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: 'mu/user',
          credentials: 'include',
          method: 'DELETE',
        }
      },
    }),
    deleteMe: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: 'user',
          credentials: 'include',
          method: 'DELETE',
        }
      },
    }),
    getUserLimits: builder.query<IDailyReportLimits, void>({
      query() {
        return {
          url: 'user/limits',
          credentials: 'include',
        }
      },
      transformResponse: (res) => res as IDailyReportLimits,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setReportLimits(data))
        } catch (err) {
          // * no need to handle error
        }
      },
    }),
    updatePaymentMethod: builder.mutation<IGenericResponse, IUpdatePaymentMethodInput>({
      query({ tokenId, threeDSecureToken }) {
        return {
          url: 'update_payment_method',
          credentials: 'include',
          method: 'POST',
          body: {
            paymentMethod: tokenId,
            threeDSecureToken,
          },
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(planApi.endpoints.getSubscription.initiate(undefined, { forceRefetch: true }))
        } catch (err) {
          // * no need to handle error
        }
      },
    }),
    updateBillingInformation: builder.mutation<IInvoicingSettings, IUpdateBillingInformationInput>({
      query({
        company,
        firstName,
        lastName,
        street1,
        street2,
        city,
        region,
        countryCode,
        phone,
        postalCode,
        vatNumber,
      }) {
        return {
          url: 'update_invoicing_settings',
          credentials: 'include',
          method: 'POST',
          body: {
            company,
            first_name: firstName,
            last_name: lastName,
            street1,
            street2,
            city,
            region,
            country: countryCode,
            phone: `${getPhoneCodeFromCountryCode(countryCode)}${phone}`,
            vat_number: vatNumber,
            postal_code: postalCode,
            preferred_locale: getLanguageCode(),
          },
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setInvoicingSettings(data))
        } catch (err) {
          // * no need to handle error
        }
      },
    }),
  }),
})

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useRemoveMeFromAccountMutation,
  useChangeLoginMethodToEmailMutation,
  useDeleteMeMutation,
  useGetUserLimitsQuery,
  useLazyGetUserLimitsQuery,
  useUpdatePaymentMethodMutation,
  useUpdateBillingInformationMutation,
} = userApi
