"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAcvRangeData } from '@/store/slices/acvRangeSlice';
import { Card, CardContent, CardHeader, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { AcvRangeChart } from "@/components/charts/acv-range-chart"

export function AcvRangeCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.acvRange);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAcvRangeData());
    }
  }, [status, dispatch]);

  return (
    <Card>
      <CardHeader
        title="ACV Range"
        subheader="A donut chart shows the proportion of each ACV range relative to the total ACV"
      />
      <CardContent>
        {status === 'loading' && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><CircularProgress /></Box>}
        {status === 'succeeded' && <AcvRangeChart data={data} />}
        {status === 'failed' && <Alert severity="error">{error || 'Could not load ACV range data.'}</Alert>}
      </CardContent>
    </Card>
  );
}
