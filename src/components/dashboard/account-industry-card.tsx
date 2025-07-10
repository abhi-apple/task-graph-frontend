"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAccountIndustryData } from '@/store/slices/accountIndustrySlice';
import { Card, CardContent, CardHeader, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { AccountIndustryChart } from "@/components/charts/account-industry-chart"

export function AccountIndustryCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.accountIndustry);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAccountIndustryData());
    }
  }, [status, dispatch]);

  return (
    <Card>
      <CardHeader
        title="Account Industry"
        subheader="A horizontal bar chart is ideal for comparing categories with long labels, ensuring readability."
      />
      <CardContent>
        {status === 'loading' && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><CircularProgress /></Box>}
        {status === 'succeeded' && <AccountIndustryChart data={data} />}
        {status === 'failed' && <Alert severity="error">{error || 'Could not load account industry data.'}</Alert>}
      </CardContent>
    </Card>
  );
}
