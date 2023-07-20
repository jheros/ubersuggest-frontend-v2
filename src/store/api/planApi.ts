import { createApi } from '@reduxjs/toolkit/query/react'
import { IPlanEntity } from 'store/types'
import { baseQueryWithReauth } from 'store/utils'

import { setPlans } from '../reducers/plan'

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Plan'],
  endpoints: (builder) => ({
    getPlans: builder.query<IPlanEntity, string | void>({
      query(subscriptionType = 'recurly') {
        return {
          url: 'tiers',
          credentials: 'include',
          params: { subscriptionType },
        }
      },
      transformResponse: (res) => res as IPlanEntity,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          await dispatch(setPlans(data))
        } catch (err) {
          console.error(err)
        }
      },
    }),
  }),
})

export const { useGetPlansQuery, useLazyGetPlansQuery } = planApi
