"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCustomerTypeData } from '@/store/slices/customerTypeSlice';
import { Card, CardContent, CardHeader, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { CustomerTypeChart } from "@/components/charts/customer-type-chart"

export function CustomerTypeCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.customerType);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCustomerTypeData());
    }
  }, [status, dispatch]);

  return (
    <Card>
      <CardHeader
        title="Customer Type"
        subheader="A bar chart is used here to clearly compare the counts of different discrete categories."
      />
      <CardContent>
        {status === 'loading' && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><CircularProgress /></Box>}
        {status === 'succeeded' && <CustomerTypeChart data={data} />}
        {status === 'failed' && <Alert severity="error">{error || 'Could not load customer type data.'}</Alert>}
      </CardContent>
    </Card>
  );
}
