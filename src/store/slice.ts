import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Jobs } from '../../types';

interface JobState {
  savedJobs: Jobs[];

}

const initialState: JobState = {
  savedJobs: [],
 
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<Jobs>) => {
      state.savedJobs.push(action.payload);
      localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs));
    },
    removed: (state, action: PayloadAction<number>) => {
      state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload);
      localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs));
    },
    initialized: (state, action: PayloadAction<Jobs[]>) => {
      state.savedJobs = action.payload;
    }
  },
});

export const { added, removed, initialized } = jobSlice.actions;
export default jobSlice.reducer;

