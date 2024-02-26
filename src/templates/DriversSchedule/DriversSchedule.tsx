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

const EmptyResult = dynamic(
  () => import("@/components/EmptyResult").then((module) => module.EmptyResult),
  {
    ssr: false,
  },
);

export function DriversSchedule() {
  const { trips, drivers, isLoading, showContent, isEmpty } =
    useDriverSchedule();

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
        </MainContainer.Content>
      )}
    </MainContainer>
  );
}
