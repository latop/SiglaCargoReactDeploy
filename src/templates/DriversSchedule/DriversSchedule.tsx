"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { GianttTable } from "@/components/GianttTable";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { JourneyFilterBar } from "@/components/JourneyFilterBar";
import { GianttZoom } from "@/components/GianttZoom";
import { TimelineTrips } from "@/components/TimelineTrips";
import { GianttProvider } from "@/hooks/useGiantt";
import { useDriverSchedule } from "./useDriversSchedule";
import dynamic from "next/dynamic";
import { JourneyDetailsDialog } from "@/components/JourneyDetailsDialog";
import { useHash } from "@/hooks/useHash";
import { useDailyTripsUnallocated } from "@/hooks/useDailyTripsUnallocated";
import { useSearchParams } from "next/navigation";
import { TimelineTripsUnallocated } from "@/components/TimelineTripsUnallocated";

const EmptyResult = dynamic(
  () => import("@/components/EmptyResult").then((module) => module.EmptyResult),
  {
    ssr: false,
  },
);

export function DriversSchedule() {
  const [hash, setHash] = useHash();
  const params = useSearchParams();
  const { data } = useDailyTripsUnallocated({
    startDate: params.get("startDate") ?? "",
    endDate: params.get("endDate") ?? "",
  });
  const formattedData = data?.slice(0, 20);
  const match = (hash as string)?.match(/#journeyDetails-(.+)/);
  const tripDetailId = match?.[1];
  const {
    trips,
    drivers,
    isLoading,
    showContent,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  } = useDriverSchedule();

  const handleCloseTripDetails = () => {
    setHash("");
  };

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Escala de Motoristas</HeaderTitle>
      </AppBar>
      <JourneyFilterBar />
      {showContent && (
        <MainContainer.Content loading={isLoading}>
          {!isEmpty && trips && drivers && (
            <GianttProvider>
              <GianttTable>
                <GianttZoom />
                <TimelineTrips
                  trips={trips}
                  drivers={drivers}
                  onPaginate={loadMore}
                  isReachingEnd={isReachingEnd}
                  isLoadingMore={!!isLoadingMore}
                />
                {formattedData && (
                  <TimelineTripsUnallocated tripsUnallocated={formattedData} />
                )}
              </GianttTable>
            </GianttProvider>
          )}
          {isEmpty && <EmptyResult />}
        </MainContainer.Content>
      )}
      {tripDetailId && (
        <JourneyDetailsDialog
          open={!!tripDetailId}
          id={tripDetailId}
          onClose={handleCloseTripDetails}
        />
      )}
    </MainContainer>
  );
}
