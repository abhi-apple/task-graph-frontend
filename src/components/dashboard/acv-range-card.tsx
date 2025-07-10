"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAcvRangeData } from '@/store/slices/acvRangeSlice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AcvRangeChart } from "@/components/charts/acv-range-chart"
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';

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
      <CardHeader>
        <CardTitle>ACV Range</CardTitle>
        <CardDescription>A donut chart shows the proportion of each ACV range relative to the total ACV, highlighting part-to-whole relationships.</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'loading' && <Skeleton className="h-[300px] w-full" />}
        {status === 'succeeded' && <AcvRangeChart data={data} />}
        {status === 'failed' && (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
            <Alert variant="destructive" className="w-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'Could not load ACV range data.'}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
