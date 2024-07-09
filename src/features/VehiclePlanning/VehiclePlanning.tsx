"use client";

import React, { useEffect } from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Card, CircularProgress } from "@mui/material";
import { EmptyResult } from "@/components/EmptyResult";
import { useVehiclePlannings } from "@/hooks/useVehiclePlannings";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorResult } from "@/components/ErrorResult";
import { VehiclePlanning } from "@/interfaces/vehicle";
import { DailyTripDetailsDialog } from "@/components/DailyTripDetailsDialog";
import { useHash } from "@/hooks/useHash";
import { VehiclePlanningsFilterBar } from "@/components/VehiclePlanningsFilterBar";

const columns: GridColDef[] = [
  {
    field: "truck.licensePlate",
    headerName: "Placa",
    width: 200,
    sortable: false,
    filterable: false,
  },
  {
    field: "truck.fleetCode",
    headerName: "Cód. Frota",
    width: 200,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: VehiclePlanning) => {
      return data.line ? data.line.code : "N/A";
    },
  },
  {
    field: "driverId",
    headerName: "Motorista",
    width: 100,
    sortable: false,
    filterable: false,
  },
  {
    field: "truck.locationGroupId",
    headerName: "Cód localização",
    width: 200,
    sortable: false,
    filterable: false,
  },
  {
    field: "truck.fleetType.code",
    headerName: "Gr. de frota",
    width: 200,
    sortable: false,
    filterable: false,
  },
  {
    field: "startTime",
    headerName: "Início",
    width: 150,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "N/A",
  },
  {
    field: "endTime",
    headerName: "Fim",
    width: 150,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "N/A",
  },

  {
    field: "freqMon",
    headerName: "Fim",
    width: 150,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: VehiclePlanning) => {
      return data.freqMon ? data.freqMon : "N/A";
    },
  },
];

export function VehiclePlanning() {
  const [hash, setHash] = useHash();
  const isOpen = hash.includes("vehiclePlanning");
  const params = useSearchParams();
  const router = useRouter();
  const {
    vehiclePlannings,
    isLoading,
    hasData,
    isEmpty,
    size,
    error,
    totalCount,
    loadMore,
  } = useVehiclePlannings();

  const showContent = params.get("tripDate");

  const handleCloseDialog = () => {
    setHash("");
  };

  useEffect(() => {
    if (!params.get("tripDate")) {
      const newParams = new URLSearchParams();
      newParams.append("tripDate", dayjs().format("YYYY-MM-DD"));
      router.push(`/vehicle-planning?${newParams.toString()}`);
    }
  }, [params]);

  const handleAddTravel = () => {
    setHash("#vehiclePlanning");
  };

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Planejamento de veículos</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "1400px",
          height: "100%",
          padding: "20px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <VehiclePlanningsFilterBar />
        <Box display="flex" justifyContent="flex-end" mt="25px" mb="10px">
          <Button variant="outlined" size="small" onClick={handleAddTravel}>
            Adicionar viagem
          </Button>
        </Box>
        {showContent && (
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
          >
            {isLoading && <CircularProgress />}
            {isEmpty && <EmptyResult />}
            {error && <ErrorResult />}
            {hasData && (
              <div style={{ height: "100%", width: "100%" }}>
                <DataGrid
                  rows={vehiclePlannings}
                  localeText={{
                    noRowsLabel: "Nenhum registro encontrado",
                    columnMenuHideColumn: "Ocultar coluna",
                    columnsManagementShowHideAllText: "Mostrar/Ocultar todas",
                    columnMenuManageColumns: "Gerenciar colunas",
                    MuiTablePagination: {
                      labelRowsPerPage: "Registros por página",
                      labelDisplayedRows: ({ from, to, count }) =>
                        `${from}-${to} de ${
                          count !== -1 ? count : `mais de ${to}`
                        }`,
                    },
                  }}
                  columns={columns}
                  onCellDoubleClick={(params) => {
                    setHash(`#vehiclePlanning-${params.row.id}`);
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: { page: size - 1, pageSize: 10 },
                    },
                  }}
                  onPaginationModelChange={(params) => {
                    loadMore(params.page + 1);
                  }}
                  rowCount={totalCount}
                  pageSizeOptions={[10]}
                />
              </div>
            )}
          </Card>
        )}
      </Box>
      <DailyTripDetailsDialog open={!!isOpen} onClose={handleCloseDialog} />
    </MainContainer>
  );
}
