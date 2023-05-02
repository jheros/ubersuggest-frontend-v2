import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from 'store/reducers';
// import { aiWriterApi } from './ai-writer/ai-writer.api';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    // [aiWriterApi.reducerPath]: aiWriterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
