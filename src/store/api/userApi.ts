import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import type { IRootState } from 'store'

import { setUserInfo } from '../reducers/auth'
import type { IUserInfo } from '../types'
import { retryCondition } from '../utils'

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as IRootState).auth.userToken?.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        return headers
      }
    },
    credentials: 'include',
  }),
  { retryCondition },
)

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
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
          await dispatch(setUserInfo({ ...data, is_annonymous: !data }))
        } catch (err) {
          await dispatch(setUserInfo({ is_annonymous: true }))
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
  }),
})

export const { useGetMeQuery, useLazyGetMeQuery } = userApi
