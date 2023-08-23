import { createApi } from '@reduxjs/toolkit/query/react'
import { ADDON_TYPES } from 'configs/addon'
import { setAddons } from 'store/reducers/addon'
import { IAddonEntity, IGenericResponse, IPurchaseAddonInput } from 'store/types'
import { baseQueryWithReauth } from 'store/utils'

import { planApi } from './planApi'
import { projectApi } from './projectApi'
import { userApi } from './userApi'

export const addonApi = createApi({
  reducerPath: 'addonApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Addon'],
  endpoints: (builder) => ({
    getAddons: builder.query<IAddonEntity, void>({
      query() {
        return {
          url: 'addons',
          credentials: 'include',
        }
      },
      transformResponse: (res) => res as IAddonEntity,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setAddons(data))
        } catch (err) {
          // * we don't need to handle error here
        }
      },
    }),
    purchaseAddon: builder.mutation<IGenericResponse, IPurchaseAddonInput>({
      query({ addonCode, projectId }) {
        return {
          url: `subscription/addons/${addonCode}`,
          credentials: 'include',
          method: 'PUT',
          params: projectId
            ? {
                projectId,
              }
            : {},
        }
      },
      async onQueryStarted({ addonType, projectId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          if (addonType === ADDON_TYPES.ADDON_DAILYSEARCH) {
            dispatch(userApi.endpoints.getUserLimits.initiate())
          }
          // todo: refactor using invalidateTags
          dispatch(userApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }))
          dispatch(planApi.endpoints.getSubscription.initiate(undefined, { forceRefetch: true }))
          if (projectId) {
            dispatch(projectApi.endpoints.getProject.initiate(projectId, { forceRefetch: true }))
          }
        } catch (err) {
          // * we don't need to handle error here
        }
      },
    }),
  }),
})

export const { useGetAddonsQuery, useLazyGetAddonsQuery, usePurchaseAddonMutation } = addonApi
