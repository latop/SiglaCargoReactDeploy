"use client";

import React, { useMemo } from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { GianttTable } from "@/components/GianttTable";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { JourneyFilterBar } from "@/components/JourneyFilterBar";
import { useSearchParams } from "next/navigation";

interface JourneySearchParams {
  startDate?: string;
  endDate?: string;
  nickName?: string;
  fleetGroupCode?: string;
  locationGroupCode?: string;
  positionCode?: string;
}

export function DriversSchedule() {
  const params = useSearchParams();
  const searchParams: Partial<JourneySearchParams> = useMemo(() => {
    const tempSearchParams: Partial<JourneySearchParams> = {};
    const paramKeys: (keyof JourneySearchParams)[] = [
      "startDate",
      "endDate",
      "nickName",
      "fleetGroupCode",
      "locationGroupCode",
      "positionCode",
    ];

    paramKeys.forEach((key) => {
      const value = params.get(key);
      if (value !== null) {
        tempSearchParams[key] = value;
      }
    });

    return tempSearchParams;
  }, [params]);

  const hasRelevantParams = Object.keys(searchParams).length > 0;

  const { trips, drivers, isLoading } = useJourneysByPeriod(searchParams);

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Escala de Motoristas</HeaderTitle>
      </AppBar>
      <JourneyFilterBar />
      {hasRelevantParams && (
        <MainContainer.Content loading={isLoading}>
          {trips && drivers && <GianttTable trips={trips} drivers={drivers} />}
        </MainContainer.Content>
      )}
    </MainContainer>
  );
}
