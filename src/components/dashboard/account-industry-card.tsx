"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAccountIndustryData } from '@/store/slices/accountIndustrySlice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AccountIndustryChart } from "@/components/charts/account-industry-chart"
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';

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
      <CardHeader>
        <CardTitle>Account Industry</CardTitle>
        <CardDescription>A horizontal bar chart is ideal for comparing categories with long labels, ensuring readability.</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'loading' && <Skeleton className="h-[300px] w-full" />}
        {status === 'succeeded' && <AccountIndustryChart data={data} />}
        {status === 'failed' && (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
            <Alert variant="destructive" className="w-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'Could not load account industry data.'}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
