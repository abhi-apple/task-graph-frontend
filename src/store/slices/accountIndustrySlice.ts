import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RawAccountIndustry } from '@/lib/types';

interface AccountIndustryState {
  data: RawAccountIndustry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AccountIndustryState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchAccountIndustryData = createAsyncThunk(
  'accountIndustry/fetchData',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account-industry`);
    return response.data;
  }
);

const accountIndustrySlice = createSlice({
  name: 'accountIndustry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountIndustryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccountIndustryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAccountIndustryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default accountIndustrySlice.reducer;
