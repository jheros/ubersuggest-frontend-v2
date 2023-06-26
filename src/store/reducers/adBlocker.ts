import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { detectAdBlocker } from 'store/api'

interface IAdBlockerState {
  isDetected: boolean | null
}

const initialState = {
  isDetected: null,
} as IAdBlockerState

const adBlockerSlice = createSlice({
  name: 'adBlocker',
  initialState,
  reducers: {
    setDetectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isDetected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(detectAdBlocker.fulfilled, (state, action) => {
      state.isDetected = action.payload
    })
  },
})

export const { setDetectionStatus } = adBlockerSlice.actions

export default adBlockerSlice.reducer
