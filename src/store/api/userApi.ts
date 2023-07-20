import { createApi } from '@reduxjs/toolkit/query/react'

import { setUserInfo } from '../reducers/auth'
import type { IUserInfo } from '../types'
import { baseQueryWithReauth } from '../utils'

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
