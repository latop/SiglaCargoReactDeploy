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
import { JourneyDetailsDialog } from "@/components/JourneyDetailsDialog";
import { useHash } from "@/hooks/useHash";
import { TimelineTripsUnallocated } from "@/components/TimelineTripsUnallocated";
import { Box, Card, IconButton, CircularProgress } from "@mui/material";
import { EmptyResult } from "@/components/EmptyResult";

export function DriversSchedule() {
  const [expanded, setExpanded] = React.useState(false);

  const [hash, setHash] = useHash();
  const match = (hash as string)?.match(/#journeyDetails-(.+)/);
  const tripDetailId = match?.[1];
  const {
    trips,
    drivers,
    circuits,
    isLoadingJourneys,
    showContent,
    isEmpty,
    isLoadingMoreDrivers,
    dailyTripsUnallocated,
    isReachingEndDrivers,
    loadMoreDrivers,
    isLoadingMoreTripsUnallocated,
    isLoadingTripsUnallocated,
    loadMoreTripsUnallocated,
    isReachingEndTripsUnallocated,
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
        <MainContainer.Content sx={{ overflow: "hidden" }}>
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
              <Box sx={{ height: "calc(100% - 40px)", width: "100%" }}>
                <Card
                  sx={{
                    height: "calc(75% - 10px)",
                    overflow: "auto",
                    marginTop: "10px",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  {isLoadingJourneys && (
                    <CircularProgress
                      sx={{
                        margin: "auto",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                      }}
                    />
                  )}
                  {isEmpty && <EmptyResult />}
                  {!isLoadingJourneys &&
                    trips &&
                    drivers &&
                    circuits &&
                    !isEmpty && (
                      <TimelineTrips
                        onPaginate={loadMoreDrivers}
                        isReachingEnd={isReachingEndDrivers}
                        isLoadingMore={!!isLoadingMoreDrivers}
                      />
                    )}
                </Card>
                <Card
                  sx={{
                    height: "calc(25% - 25px)",
                    overflow: "auto",
                    marginTop: "15px",
                    position: "relative",
                  }}
                >
                  {isLoadingTripsUnallocated && (
                    <CircularProgress
                      sx={{
                        margin: "auto",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                      }}
                    />
                  )}
                  {!isLoadingTripsUnallocated && dailyTripsUnallocated && (
                    <TimelineTripsUnallocated
                      onPaginate={loadMoreTripsUnallocated}
                      isReachingEnd={isReachingEndTripsUnallocated}
                      isLoadingMore={!!isLoadingMoreTripsUnallocated}
                    />
                  )}
                </Card>
              </Box>
            </GianttTable>
          </GianttProvider>
        </MainContainer.Content>
      )}
      {tripDetailId && (
        <JourneyDetailsDialog
          open={!!tripDetailId}
          onClose={handleCloseTripDetails}
        />
      )}
    </MainContainer>
  );
}
