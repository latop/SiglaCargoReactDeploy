"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { Box, Card } from "@mui/material";
import { PublishJourneyFilterBar } from "@/components/PublishJourneyFilterBar";
import { usePublishJourney } from "@/hooks/usePublishJourney";

export function PublishJourney() {
  const { data } = usePublishJourney();
  console.log(data);
  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Publicação</HeaderTitle>
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
        <PublishJourneyFilterBar />
        <Card
          sx={{
            width: "100%",
            height: "635px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Card>
      </Box>
    </MainContainer>
  );
}
