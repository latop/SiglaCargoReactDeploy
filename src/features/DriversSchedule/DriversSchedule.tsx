"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { GianttTable } from "@/components/GianttTable";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import theme from "@/styles/theme";
import { JourneyFilterBar } from "@/components/JourneyFilterBar";
import { GianttZoom } from "@/components/GianttZoom";
import { GianttProvider } from "@/hooks/useGiantt";
import { useDriverSchedule } from "./useDriversSchedule";
import { JourneyDetailsDialog } from "@/components/JourneyDetailsDialog";
import { useHash } from "@/hooks/useHash";
import { Box, Button, IconButton, Typography, Icon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TimelineTripsCard } from "./components/TimelineTripsCard";
import { TimelineTripsUnallocatedCard } from "./components/TimelineTripsUnallocatedCard";
import { ActivityDialog } from "@/components/ActivityDialog";

export function DriversSchedule() {
  const [expanded, setExpanded] = React.useState(false);
  const [showActivityDialog, setShowActivityDialog] = React.useState(false);
  const [showJourneyDialog, setShowJourneyDialog] = React.useState(false);

  const handleOpenJourneyDialog = () => {
    setShowJourneyDialog(true);
  };

  const handleCloseJourneyDialog = () => {
    setShowJourneyDialog(false);
  };

  const handleOpenActivityDialog = () => {
    setShowActivityDialog(true);
  };

  const handleCloseActivityDialog = () => {
    setShowActivityDialog(false);
    setHash("");
  };

  const [, setHash] = useHash();
  const { showContent, tripDetailId, activityDetailId } = useDriverSchedule();

  const handleCloseTripDetails = () => {
    handleCloseJourneyDialog();
    setHash("");
  };

  const toggleExpanded = () => {
    setExpanded((prev: boolean) => !prev);
  };

  return (
    <MainContainer>
      <AppBar style={{ display: expanded ? "none" : "block" }}>
        <HeaderTitle>Escala de Motoristas</HeaderTitle>
      </AppBar>
      <JourneyFilterBar style={{ display: expanded ? "none" : "block" }} />
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
                  justifyContent="center"
                  alignItems="center"
                  marginTop="20px"
                >
                  <GianttZoom />
                  <IconButton
                    sx={{ padding: 0 }}
                    onClick={toggleExpanded}
                    aria-label="expandir tabela de motoristas"
                  >
                    <AspectRatioIcon />
                  </IconButton>
                </Box>
                <Box display="flex" gap="10px">
                  <Button
                    variant="outlined"
                    onClick={handleOpenJourneyDialog}
                    color="primary"
                    size="medium"
                  >
                    <Icon component={AddIcon} fontSize="small" />
                    <Typography
                      variant="body2"
                      ml="5px"
                      color={theme.palette.primary.main}
                    >
                      Circuito
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleOpenActivityDialog}
                    color="primary"
                    size="medium"
                  >
                    <Icon component={AddIcon} fontSize="small" />
                    <Typography
                      variant="body2"
                      ml="5px"
                      color={theme.palette.primary.main}
                    >
                      Atividade
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <Box sx={{ height: "calc(100% - 40px)", width: "100%" }}>
                <>
                  <TimelineTripsCard key="TimelineTripsCard" />
                </>
                <>
                  <TimelineTripsUnallocatedCard key="TimelineTripsUnallocatedCard" />
                </>
              </Box>
            </GianttTable>
          </GianttProvider>
        </MainContainer.Content>
      )}
      {(tripDetailId || showJourneyDialog) && (
        <JourneyDetailsDialog open onClose={handleCloseTripDetails} />
      )}
      {(showActivityDialog || activityDetailId) && (
        <ActivityDialog open onClose={handleCloseActivityDialog} />
      )}
    </MainContainer>
  );
}
