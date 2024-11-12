"use client";

import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { useDriversPaginated } from "@/hooks/useDrivers";
import { Box } from "@mui/material";

export function Drivers() {
  useDriversPaginated();
  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Motoristas</HeaderTitle>
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
        Teste
      </Box>
    </MainContainer>
  );
}
