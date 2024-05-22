"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Card, CircularProgress } from "@mui/material";
import { EmptyResult } from "@/components/EmptyResult";
import dayjs from "dayjs";
import { ErrorResult } from "@/components/ErrorResult";
import { DailyTripDetailsDialog } from "@/components/DailyTripDetailsDialog";
import { useHash } from "@/hooks/useHash";
import { useScenarios } from "@/hooks/useScenarios";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const columns: GridColDef[] = [
  {
    field: "code",
    headerName: "Cód. Linha",
    width: 200,
    sortable: false,
    filterable: false,
  },
  {
    field: "description",
    headerName: "Descrição",
    width: 300,
    sortable: false,
    filterable: false,
  },
  {
    field: "isDated",
    headerName: "Datado",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return params.value ? <CheckIcon /> : <CloseIcon />;
    },
  },
  {
    field: "isDefault",
    headerName: "Default",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return params.value ? <CheckIcon /> : <CloseIcon />;
    },
  },
  {
    field: "startDate",
    headerName: "Data de início",
    width: 150,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "N/A",
  },
  {
    field: "endDate",
    headerName: "Data de fim",
    width: 150,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "N/A",
  },
];

export function Scenarios() {
  const [hash, setHash] = useHash();
  const match = (hash as string)?.match(/#scenario-(.+)/);
  const scenarioId = match?.[1];
  const {
    scenarios,
    isLoading,
    hasData,
    isEmpty,
    size,
    error,
    totalCount,
    loadMore,
  } = useScenarios();

  const handleCloseDialog = () => {
    setHash("");
  };

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Cenários</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "1150px",
          height: "100%",
          padding: "20px",
          gap: "20px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "calc(100% - 20px)",
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
                rows={scenarios}
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
                  setHash(`#scenario-${params.row.id}`);
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
      </Box>
      <DailyTripDetailsDialog open={!!scenarioId} onClose={handleCloseDialog} />
    </MainContainer>
  );
}
