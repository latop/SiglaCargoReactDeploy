"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { Box, Typography } from "@mui/material";
import { colors } from "@mui/material";
export function Home() {
  return (
    <MainContainer>
      <AppBar>
        <Typography color={colors.grey[50]} variant="h6">
          Home
        </Typography>
      </AppBar>
      <Box>Home</Box>
    </MainContainer>
  );
}
