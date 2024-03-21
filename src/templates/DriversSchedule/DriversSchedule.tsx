"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
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
import { TimelineTripsUnallocated } from "@/components/TimelineTripsUnallocated";
import { Box, IconButton } from "@mui/material";

const EmptyResult = dynamic(
  () => import("@/components/EmptyResult").then((module) => module.EmptyResult),
  {
    ssr: false,
  },
);

export function DriversSchedule() {
  const [expanded, setExpanded] = React.useState(false);

  const [hash, setHash] = useHash();
  const match = (hash as string)?.match(/#journeyDetails-(.+)/);
  const tripDetailId = match?.[1];
  const {
    trips,
    drivers,
    isLoading,
    showContent,
    isEmpty,
    isLoadingMore,
    dailyTripsUnallocated,
    isReachingEnd,
    loadMore,
  } = useDriverSchedule();

  const handleCloseTripDetails = () => {
    setHash("");
  };

  const toggleExpanded = () => {
    setExpanded((prev: boolean) => !prev);
  };

  return (
    <MainContainer>
      <AppBar style={{ display: expanded ? "none" : "block" }}>
        <HeaderTitle>Escala de Motoristas</HeaderTitle>
      </AppBar>
      <JourneyFilterBar style={{ display: expanded ? "none" : "block" }} />
      {showContent && (
        <MainContainer.Content sx={{ overflow: "hidden" }} loading={isLoading}>
          {!isEmpty && trips && drivers && (
            <GianttProvider>
              <GianttTable>
                <Box
                  width="100%"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <GianttZoom />
                  <IconButton
                    sx={{ padding: 0 }}
                    onClick={toggleExpanded}
                    aria-label="expandir tabela de motoristas"
                  >
                    <AspectRatioIcon />
                  </IconButton>
                </Box>
                <Box sx={{ height: "calc(100% - 40px)" }}>
                  <TimelineTrips
                    trips={trips}
                    drivers={drivers}
                    onPaginate={loadMore}
                    isReachingEnd={isReachingEnd}
                    isLoadingMore={!!isLoadingMore}
                  />
                  {dailyTripsUnallocated && (
                    <TimelineTripsUnallocated
                      tripsUnallocated={dailyTripsUnallocated}
                    />
                  )}
                </Box>
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
