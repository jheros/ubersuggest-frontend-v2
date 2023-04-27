import { configureStore } from '@reduxjs/toolkit';

import alertsReducer from 'src/redux/alerts/alertsSlice';

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
