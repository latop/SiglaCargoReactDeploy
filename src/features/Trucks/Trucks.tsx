"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { Box } from "@mui/material";
import { useTrucks } from "./useTrucks";
import { TrucksFilterBar } from "@/components/TrucksFilterBar";

export function Trucks() {
  const { data } = useTrucks();
  console.log(data);
  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Caminhão</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "1400px",
          height: "calc(100% - 64px)",
          padding: "20px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TrucksFilterBar />
      </Box>
    </MainContainer>
  );
}
