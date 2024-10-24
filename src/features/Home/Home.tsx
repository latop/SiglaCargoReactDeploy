"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { useGetDashboardQuery } from "@/services/query/dashboard.query";
import { Box, Card, CardContent, Grid, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DemandsChart from "./components/demandsChart";
import SkeletonChart from "./components/skeletonChart";
import TripAttribChart from "./components/tripAttribChart";
import TripsChart from "./components/tripsChart";
import TripsCompletedCard from "./components/tripsCompletedChart";
import CardIndicator from "@/features/Home/components/cardIndicator";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export function Home() {
  const { data, isLoading, isError } = useQuery(useGetDashboardQuery);
  console.log(data);
  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Home</HeaderTitle>
      </AppBar>
      {isError && <div>Error</div>}

      {isLoading && (
        <Grid sx={{padding: 4}} container rowSpacing={4} columnSpacing={4} >
          <Grid item xs={12}>
            <SkeletonChart height={98} />
          </Grid>
          <Grid item xs={6}> <SkeletonChart /> </Grid>
          <Grid item xs={6}> <SkeletonChart /> </Grid>
          <Grid item xs={6}> <SkeletonChart /> </Grid>
          <Grid item xs={6}> <SkeletonChart /> </Grid>
        </Grid>

      )}

      {!isLoading && data && (
        <Box sx={{ padding: 2 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <CardIndicator value={312} title={"Últimos 3 dias"} />
              <CardIndicator value={27} title={"Hoje"} />
              <CardIndicator value={5} title={"Próximos 3 dias"} />
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Grid container rowSpacing={4} columnSpacing={4}>
                <Grid item xs={6}>
                  {data.dashboardDemands && (
                    <DemandsChart data={data.dashboardDemands} />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {data.dashboardTrips && (
                    <TripsChart data={data.dashboardTrips} />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {data.dashboardTripsAttrib && (
                    <TripAttribChart data={data.dashboardTripsAttrib} />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {data.dashboardTripsCompleted && (
                    <TripsCompletedCard data={data.dashboardTripsCompleted} />
                  )}
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </MainContainer>
  )
}