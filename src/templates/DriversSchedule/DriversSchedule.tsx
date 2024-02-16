"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { Typography } from "@mui/material";
import { colors } from "@mui/material";

export function DriversSchedule() {
  return (
    <MainContainer>
      <AppBar>
        <Typography color={colors.grey[50]} variant="h6">
          Escala de Motoristas
        </Typography>
      </AppBar>
    </MainContainer>
  );
}
