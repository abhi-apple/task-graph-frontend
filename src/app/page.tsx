import { CustomerTypeCard } from '@/components/dashboard/customer-type-card';
import { AccountIndustryCard } from '@/components/dashboard/account-industry-card';
import { TeamCard } from '@/components/dashboard/team-card';
import { AcvRangeCard } from '@/components/dashboard/acv-range-card';
import { Database } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-7xl">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-4 mb-4">
            <Database className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
              DataDive Dashboard
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            An interactive overview of your customer data, demonstrating various chart types for insightful data visualization.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CustomerTypeCard />
          <AccountIndustryCard />
          <TeamCard />
          <AcvRangeCard />
        </div>
      </div>
    </main>
  );
}
