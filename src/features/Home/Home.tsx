"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { useGetDashboardQuery } from "@/services/query/dashboard.query";
import { Box, Card, CardContent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DemandsChart from "./components/demandsChart";
import SkeletonChart from "./components/skeletonChart";
import TripAttribChart from "./components/tripAttribChart";
import TripsChart from "./components/tripsChart";
import TripsCompletedCard from "./components/tripsCompletedChart";

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
        <div
          style={{
            display: "flex",
            gap: 10,
            flexDirection: "column",
            padding: 40,
          }}
        >
          <SkeletonChart height={98} />
          <div style={{ display: "flex", gap: 10 }}>
            <SkeletonChart />
            <SkeletonChart />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <SkeletonChart />
            <SkeletonChart />
          </div>
        </div>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2> Últimos 3 dias</h2>
                <h3>10</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Hoje</h2>
                <h3>10</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Próximos 3 dias</h2>
                <h3>10</h3>
              </div>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 5 }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  {data.dashboardDemands && (
                    <DemandsChart data={data.dashboardDemands} />
                  )}
                  {data.dashboardTripsAttrib && (
                    <TripsChart data={data.dashboardTripsAttrib} />
                  )}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {data.dashboardTripsAttrib && (
                    <TripAttribChart data={data.dashboardTripsAttrib} />
                  )}
                  {data.dashboardTripsCompleted && (
                    <TripsCompletedCard data={data.dashboardTripsCompleted} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Box>
      )}
    </MainContainer>
  );
}
