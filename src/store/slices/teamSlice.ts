import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RawTeam } from '@/lib/types';

interface TeamState {
  data: RawTeam[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TeamState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchTeamData = createAsyncThunk(
  'team/fetchData',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team`);
    return response.data;
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeamData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTeamData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default teamSlice.reducer;
