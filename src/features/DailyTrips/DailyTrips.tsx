"use client";

import React, { useEffect } from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Card, CircularProgress } from "@mui/material";
import { EmptyResult } from "@/components/EmptyResult";
import { useDailyTrips } from "@/hooks/useDailyTrips";
import { DailyTripsFilterBar } from "@/components/DailyTripsFilterBar";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";

const columns: GridColDef[] = [
  { field: "sto", headerName: "Sto", width: 200 },
  { field: "line.code", headerName: "Cód. Linha", width: 200 },
  { field: "flgStatus", headerName: "Status", width: 100 },
  { field: "fleetGroup.code", headerName: "Cód frota", width: 200 },
  { field: "tripType.code", headerName: "Tipo de viagem", width: 200 },
  { field: "locationOrig.code", headerName: "Origem", width: 150 },
  { field: "locationDest.code", headerName: "Destino", width: 150 },
  {
    field: "tripDate",
    headerName: "Data da viagem",
    width: 150,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "N/A",
  },
];

export function DailyTrips() {
  const params = useSearchParams();
  const router = useRouter();
  const { dailyTrips, isLoading, isEmpty, size, loadMoreDailyTrips } =
    useDailyTrips();

  const showContent = params.get("tripDate");

  useEffect(() => {
    if (!params.get("tripDate")) {
      const newParams = new URLSearchParams();
      newParams.append("tripDate", dayjs().format("YYYY-MM-DD"));
      router.push(`/daily-trips?${newParams.toString()}`);
    }
  }, [params]);

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Viagens diárias</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "1400px",
          height: "100%",
          padding: "20px",
          gap: "20px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DailyTripsFilterBar />
        {showContent && (
          <Card
            sx={{
              width: "100%",
              height: "650px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading && <CircularProgress />}
            {isEmpty && <EmptyResult />}
            {!isEmpty && !isLoading && (
              <div style={{ height: "100%", width: "100%" }}>
                <DataGrid
                  rows={dailyTrips}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: size - 1, pageSize: 10 },
                    },
                  }}
                  onPaginationModelChange={(params) => {
                    loadMoreDailyTrips(params.page + 1);
                  }}
                  rowCount={200}
                  pageSizeOptions={[10, 20]}
                />
              </div>
            )}
          </Card>
        )}
      </Box>
    </MainContainer>
  );
}
