"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchTeamData } from '@/store/slices/teamSlice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TeamChart } from "@/components/charts/team-chart"
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';

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
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>A simple bar chart effectively displays and compares the size of different teams.</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'loading' && <Skeleton className="h-[300px] w-full" />}
        {status === 'succeeded' && <TeamChart data={data} />}
        {status === 'failed' && (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
            <Alert variant="destructive" className="w-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'Could not load team data.'}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
