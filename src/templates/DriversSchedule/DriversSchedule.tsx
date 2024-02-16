"use client";

import React from "react";
import dayjs from "dayjs";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { GianttTable } from "@/components/GianttTable";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";

export function DriversSchedule() {
  const { data, isLoading } = useJourneysByPeriod({
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().add(2, "days").format("YYYY-MM-DD"),
  });

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Drivers Schedule</HeaderTitle>
      </AppBar>
      <MainContainer.Content loading={isLoading}>
        {data && <GianttTable trips={data.trips} />}
      </MainContainer.Content>
    </MainContainer>
  );
}
