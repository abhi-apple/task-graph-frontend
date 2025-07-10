"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchTeamData } from '@/store/slices/teamSlice';
import { Card, CardContent, CardHeader, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { TeamChart } from "@/components/charts/team-chart"

export function TeamCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeamData());
    }
  }, [status, dispatch]);

  return (
    <Card>
      <CardHeader
        title="Team"
        subheader="A simple bar chart effectively displays and compares the size of different teams."
      />
      <CardContent>
        {status === 'loading' && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><CircularProgress /></Box>}
        {status === 'succeeded' && <TeamChart data={data} />}
        {status === 'failed' && <Alert severity="error">{error || 'Could not load team data.'}</Alert>}
      </CardContent>
    </Card>
  );
}
