import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Jobs } from '../../types';

export interface JobState {
  savedJobs: Jobs[];
}


const initialState: JobState = {
  savedJobs: [],
};

export const loadSavedJobs = createAsyncThunk(
  'jobs/loadSavedJobs',
  async () => {
    const savedJobs = localStorage.getItem('savedJobs');
    if (savedJobs) {
      return JSON.parse(savedJobs) as Jobs[];
    }
    return [] as Jobs[];
  }
);

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
    },
    setSavedJobs: (state, action: PayloadAction<Jobs[]>) => {
      state.savedJobs = action.payload;
      localStorage.setItem('savedJobs', JSON.stringify(action.payload));
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(loadSavedJobs.fulfilled, (state, action) => {
      state.savedJobs = action.payload;
    });
  },
});

export const { added, removed, setSavedJobs, initialized } = jobSlice.actions;
export default jobSlice.reducer;