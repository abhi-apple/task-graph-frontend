import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RawAcvRange } from '@/lib/types';

interface AcvRangeState {
  data: RawAcvRange[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AcvRangeState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchAcvRangeData = createAsyncThunk(
  'acvRange/fetchData',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/acv-range`);
    return response.data;
  }
);

const acvRangeSlice = createSlice({
  name: 'acvRange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcvRangeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAcvRangeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAcvRangeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default acvRangeSlice.reducer;