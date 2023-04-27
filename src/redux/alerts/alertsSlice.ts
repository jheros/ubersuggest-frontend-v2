import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'src/redux/store';

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

export const selectAlertsDomain = (state: RootState) => state.alerts;
export const selectAlerts = () => (state: RootState) => state.alerts.data;
export const selectSiteAuditReportReadyAlerts = () => (state: RootState) => state.alerts.siteAuditReportAlert;

export default alertsSlice.reducer;
