"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { useGetDashboardQuery } from "@/services/query/dashboard.query";
import { useQuery } from "@tanstack/react-query";
import TripsCompletedCard from "./components/tripsCompletedChart";
import TripAttribChart from "./components/tripAttribChart";

export function Home() {
  const { data, isLoading, isError } = useQuery(useGetDashboardQuery);
  console.log(data);
  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Home</HeaderTitle>
      </AppBar>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}

      {!isLoading && (
        <div>
          <div style={{ display: "flex", gap: 10, padding: 40 }}>
            {/* <div style={{ flex: 1 }}><DemandsChart /></div>
          <div style={{ flex: 1 }}><TripsChart /></div>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: 40 }}>
          <div style={{ flex: 1 }}><TripAttribChart /></div> */}
            {data && data.dashboardTripsAttrib && (
              <div style={{ flex: 1 }}>
                <TripAttribChart data={data.dashboardTripsAttrib} />
              </div>
            )}
            {data && data.dashboardTripsCompleted && (
              <div style={{ flex: 1 }}>
                <TripsCompletedCard data={data.dashboardTripsCompleted} />
              </div>
            )}
          </div>
        </div>
      )}
    </MainContainer>
  );
}
