import { createDraftSafeSelector, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { findKey, size } from 'lodash'
import { IRootState } from 'store'
import type { IAddonEntity } from 'store/types'

interface IAddonState {
  entities: IAddonEntity
  isLoaded: boolean
}

const initialState = {
  entities: {},
  isLoaded: false,
} as IAddonState

const addonSlice = createSlice({
  name: 'addon',
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<IAddonEntity>) => {
      state.entities = action.payload
      state.isLoaded = true
    },
  },
})

export const isAddonsAvailableSelector = createDraftSafeSelector(
  (state: IRootState) => size(state.addon.entities) || 0,
  (count) => count > 0,
)

export const addonByTypeSelector = createDraftSafeSelector(
  (state: IRootState) => state.addon.entities,
  (_: IRootState, type: string) => type,
  (addons, type) => {
    const code = findKey(addons, (_, key) => key.includes(type))
    if (code && addons[code]) {
      return {
        code,
        ...addons[code],
      }
    }
  },
)

export const { setAddons } = addonSlice.actions

export default addonSlice.reducer
