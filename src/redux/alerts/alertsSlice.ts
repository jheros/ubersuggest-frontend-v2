import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AlertsState {
  siteAuditReportAlert: any;
  data: any;
}

const initialState: AlertsState = {
  siteAuditReportAlert: null,
  data: null,
};

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {},
});

export const {} = alertsSlice.actions;

export default alertsSlice.reducer;
