import { configureStore } from '@reduxjs/toolkit';
import customerTypeReducer from './slices/customerTypeSlice';
import accountIndustryReducer from './slices/accountIndustrySlice';
import teamReducer from './slices/teamSlice';
import acvRangeReducer from './slices/acvRangeSlice';

export const store = configureStore({
  reducer: {
    customerType: customerTypeReducer,
    accountIndustry: accountIndustryReducer,
    team: teamReducer,
    acvRange: acvRangeReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
