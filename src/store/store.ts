import { configureStore } from '@reduxjs/toolkit';
import jobsReducer, { loadSavedJobs } from '@/store/slice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

// Load saved jobs when the store is created
store.dispatch(loadSavedJobs());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

