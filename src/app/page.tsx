import { CustomerTypeCard } from '@/components/dashboard/customer-type-card';
import { AccountIndustryCard } from '@/components/dashboard/account-industry-card';
import { TeamCard } from '@/components/dashboard/team-card';
import { AcvRangeCard } from '@/components/dashboard/acv-range-card';
import { Box, Typography, Grid, Container } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <StorageIcon sx={{ fontSize: '2.5rem', color: 'primary.main' }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
            DataDive Dashboard
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          An interactive overview of your customer data, demonstrating various chart types for insightful data visualization.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <CustomerTypeCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AccountIndustryCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TeamCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AcvRangeCard />
        </Grid>
      </Grid>
    </Container>
  );
}
