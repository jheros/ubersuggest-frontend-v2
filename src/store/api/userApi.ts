import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { retryCondition } from '../utils'
import { setUserInfo } from '../reducers/auth'
import type { IUserInfo } from '../types'
import type { IRootState } from 'store'

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
    getMe: builder.query<IUserInfo, null>({
      query() {
        return {
          url: 'user',
          credentials: 'include',
        }
      },
      transformResponse: (res) => res as IUserInfo,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        await dispatch(setUserInfo(data))
      },
    }),
  }),
})

export const { useGetMeQuery } = userApi
