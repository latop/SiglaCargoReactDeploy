"use client";

import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { TripOptmizationFilterBar } from "@/components/TripOptimizationFilterBar";
import { useTripOptimization } from "@/hooks/useTripOptimization";
import { Box, Card, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useDialog } from "@/hooks/useDialog/useDialog";
import { useHash } from "@/hooks/useHash";
import { TripOptimizationDialog } from "@/components/TripOptimizationDialog/TripOptmizationDialog";
import { columnsConfig } from "./columnsConfig";

export function TripOptimization() {
  const { optmizedTrips, isLoading, handleDeleteOptmitzationTrip } =
    useTripOptimization();
  const { openDialog, closeDialog } = useDialog();
  const [hash, setHash] = useHash();
  const match = (hash as string)?.match(/#otmId-(.+)/);
  const otmId = match?.[1];
  const isOpen = !!otmId?.length;

  const columns = columnsConfig({
    openDialog,
    closeDialog,
    handleDeleteOptmitzationTrip,
    setHash,
  });
  return (
    <MainContainer>
      <AppBar style={{ display: "block" }}>
        <HeaderTitle>Otimização de viagens</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={2}
          minHeight={"64px"}
          alignItems={"flex-start"}
          margin="auto"
        >
          <TripOptmizationFilterBar hasFinishDate={false} />
        </Box>

        <Card
          sx={{
            width: "100%",
            height: "90%",
          }}
        >
          <Box height={"100%"} display={"flex"} justifyContent={"center"}>
            {isLoading ? (
              <CircularProgress
                sx={{
                  alignSelf: "center",
                }}
              />
            ) : (
              <DataGrid
                columns={columns}
                rows={optmizedTrips || []}
                getRowId={(row) => row.id}
                hideFooterPagination={true}
              />
            )}
          </Box>
        </Card>
      </Box>
      <TripOptimizationDialog open={isOpen} onClose={() => setHash("")} />
    </MainContainer>
  );
}
