"use client";

import React from "react";
import dayjs from "dayjs";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { Typography, Box, CircularProgress } from "@mui/material";
import { colors } from "@mui/material";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { GianttTable } from "@/components/GianttTable";

export function DriversSchedule() {
  const { data, isLoading } = useJourneysByPeriod({
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().add(2, "days").format("YYYY-MM-DD"),
  });

  return (
    <MainContainer>
      <AppBar>
        <Typography color={colors.grey[50]} variant="h6">
          Escala de Motoristas
        </Typography>
      </AppBar>
      <Box sx={{ padding: "20px" }}>
        {isLoading && <CircularProgress />}
        {!isLoading && data && <GianttTable trips={data.trips} />}
      </Box>
    </MainContainer>
  );
}
