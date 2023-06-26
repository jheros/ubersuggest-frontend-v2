import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setPlans } from '../reducers/plan'
import { IPlanEntity } from 'store/types'

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
  }),
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
