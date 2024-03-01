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
import { Waypoint } from "react-waypoint";
import { Box, CircularProgress } from "@mui/material";

const EmptyResult = dynamic(
  () => import("@/components/EmptyResult").then((module) => module.EmptyResult),
  {
    ssr: false,
  },
);

export function DriversSchedule() {
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
                <TimelineTrips trips={trips} drivers={drivers} />
              </GianttTable>
            </GianttProvider>
          )}
          {isEmpty && <EmptyResult />}
          {!isReachingEnd && (
            <Waypoint onEnter={loadMore} bottomOffset={-200} />
          )}
          {isLoadingMore && (
            <Box display="flex" justifyContent="center" mt={2} marginBottom={2}>
              <CircularProgress />
            </Box>
          )}
        </MainContainer.Content>
      )}
    </MainContainer>
  );
}
