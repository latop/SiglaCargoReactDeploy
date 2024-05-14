"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { GianttTable } from "@/components/GianttTable";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { GianttZoom } from "@/components/GianttZoom";
import { GianttProvider } from "@/hooks/useGiantt";
import { useDailyTripsSchedule } from "./useDailyTripsSchedule";
import { Box } from "@mui/material";
import { TimelineDailyTripCard } from "./components/TimelineDailyTripCard";
import { DailyTripsByPeriodFilterBar } from "@/components/DailyTripsByPeriodFilterBar";

export function DailyTripsSchedule() {
  const { showContent } = useDailyTripsSchedule();

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Coordenação de viagens</HeaderTitle>
      </AppBar>
      <DailyTripsByPeriodFilterBar />
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
                <Box
                  display="flex"
                  gap="10px"
                  marginTop="20px"
                  alignItems="center"
                >
                  <GianttZoom />
                </Box>
              </Box>
              <Box sx={{ height: "calc(100% - 40px)", width: "100%" }}>
                <Box
                  sx={{
                    height: `calc(100% - 40px)`,
                  }}
                >
                  <TimelineDailyTripCard />
                </Box>
              </Box>
            </GianttTable>
          </GianttProvider>
        </MainContainer.Content>
      )}
    </MainContainer>
  );
}
