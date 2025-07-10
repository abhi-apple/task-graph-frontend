"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCustomerTypeData } from '@/store/slices/customerTypeSlice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CustomerTypeChart } from "@/components/charts/customer-type-chart"
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';

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
      <CardHeader>
        <CardTitle>Customer Type</CardTitle>
        <CardDescription>A bar chart is used here to clearly compare the counts of different discrete categories.</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'loading' && <Skeleton className="h-[300px] w-full" />}
        {status === 'succeeded' && <CustomerTypeChart data={data} />}
        {status === 'failed' && (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
            <Alert variant="destructive" className="w-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'Could not load customer type data.'}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
