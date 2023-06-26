import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { IPlanEntity } from 'store/types'

interface IPlanState {
  entities: IPlanEntity
  isLoaded: boolean
}

const initialState = {
  entities: {},
  isLoaded: false,
} as IPlanState

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<IPlanEntity>) => {
      state.entities = action.payload
      state.isLoaded = true
    },
  },
})

export const { setPlans } = planSlice.actions

export default planSlice.reducer
