"use client";

import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { TripOptmizationFilterBar } from "@/components/TripOptmizationFilterBar";
import { useTripOptmization } from "@/hooks/useTripOptmization";
import { FetchOptmizedTripsData } from "@/interfaces/trip";
import { Box, Card, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export function TripOptmization() {
  const columns: GridColDef[] = [
    {
      field: "process",
      headerName: "Processo",
      width: 150,
    },
    {
      field: "createAt",
      headerName: "Iniciado em",
      width: 200,
      resizable: true,
      valueGetter: (_, data: FetchOptmizedTripsData) => {
        return dayjs(data.createAt).format("DD-MM-YY HH:mm");
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];

  const { optmizedTrips, isLoading } = useTripOptmization();

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
          <TripOptmizationFilterBar />
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
              />
            )}
          </Box>
        </Card>
      </Box>
    </MainContainer>
  );
}
