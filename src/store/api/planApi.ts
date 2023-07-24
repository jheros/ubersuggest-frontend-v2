import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setSubscription } from 'store/reducers/user'
import { IGenericResponse, IPlanEntity, ISendCancelationFeedbackInput, ISubscription } from 'store/types'
import { baseQueryWithReauth } from 'store/utils'

import { setPlans } from '../reducers/plan'
import { userApi } from './userApi'

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Plan'],
  endpoints: (builder) => ({
    getPlans: builder.query<IPlanEntity, string | void>({
      query(subscriptionType = 'recurly') {
        return {
          url: 'tiers',
          params: { subscriptionType },
        }
      },
      transformResponse: (res) => res as IPlanEntity,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setPlans(data))
        } catch (err) {
          // * we don't need to handle error here
        }
      },
    }),
    updatePlan: builder.mutation<IGenericResponse, string>({
      query(plan) {
        return {
          url: 'update_plan',
          credentials: 'include',
          method: 'POST',
          body: {
            plan,
          },
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // todo: refactor using invalidateTags
          dispatch(userApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }))
          dispatch(planApi.endpoints.getSubscription.initiate(undefined, { forceRefetch: true }))
        } catch (err) {
          // * we don't need to handle error here
        }
      },
    }),
    renewSubscription: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: 'subscription/reactivate',
          credentials: 'include',
          method: 'PUT',
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // todo: refactor using invalidateTags
          dispatch(userApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }))
          dispatch(planApi.endpoints.getSubscription.initiate(undefined, { forceRefetch: true }))
        } catch (err) {
          // * nothing to do
        }
      },
    }),
    migrateDeprecatedLifetime: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: 'subscription/migrate_old_lifetime',
          credentials: 'include',
          method: 'PUT',
        }
      },
    }),
    getSubscription: builder.query<ISubscription, void>({
      query() {
        return {
          url: 'subscription',
          credentials: 'include',
        }
      },
      transformResponse: (res) => res as ISubscription,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setSubscription(data))
        } catch (err) {
          // * we don't need to handle error here
        }
      },
    }),
    cancelSubscription: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: 'subscription/cancel',
          credentials: 'include',
          method: 'DELETE',
        }
      },
    }),
    sendCancelationFeedback: builder.mutation<IGenericResponse, ISendCancelationFeedbackInput>({
      query({ category, notes, status }) {
        return {
          url: 'delete_reason',
          credentials: 'include',
          method: 'POST',
          body: {
            category,
            notes,
            status,
          },
        }
      },
    }),
  }),
})

export const {
  useGetPlansQuery,
  useLazyGetPlansQuery,
  useRenewSubscriptionMutation,
  useMigrateDeprecatedLifetimeMutation,
  useGetSubscriptionQuery,
  useLazyGetSubscriptionQuery,
  useCancelSubscriptionMutation,
  useSendCancelationFeedbackMutation,
  useUpdatePlanMutation,
} = planApi
