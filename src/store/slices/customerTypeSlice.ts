import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RawCustomerType } from '@/lib/types';

interface CustomerTypeState {
  data: RawCustomerType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CustomerTypeState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchCustomerTypeData = createAsyncThunk(
  'customerType/fetchData',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer-type`);
    return response.data;
  }
);

const customerTypeSlice = createSlice({
  name: 'customerType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerTypeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerTypeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCustomerTypeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default customerTypeSlice.reducer;
