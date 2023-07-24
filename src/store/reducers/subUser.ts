import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from 'store'

interface ISubUserState {
  entities: []
  isLoaded: boolean
}

const initialState = {
  entities: [],
  isLoaded: false,
} as ISubUserState

const subUserSlice = createSlice({
  name: 'subUser',
  initialState,
  reducers: {
    setSubUsers: (state, action: PayloadAction<[]>) => {
      state.entities = action.payload
      state.isLoaded = true
    },
  },
})

export const subUserCountSelector = (state: IRootState) => state.subUser.entities.length || 0

export const { setSubUsers } = subUserSlice.actions

export default subUserSlice.reducer
