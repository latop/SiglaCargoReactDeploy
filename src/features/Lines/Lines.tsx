"use client";

import React, { useEffect } from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Card, CircularProgress } from "@mui/material";
import { EmptyResult } from "@/components/EmptyResult";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorResult } from "@/components/ErrorResult";
import { DailyTrip } from "@/interfaces/daily-trip";
import { DailyTripDetailsDialog } from "@/components/DailyTripDetailsDialog";
import { useHash } from "@/hooks/useHash";
import { useLines } from "@/hooks/useLines";
import { LinesFilterBar } from "@/components/LinesFilterBar";

const columns: GridColDef[] = [
  {
    field: "line.code",
    headerName: "Cód. Linha",
    width: 200,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: DailyTrip) => {
      return data.line ? data.line.code : "N/A";
    },
  },
  {
    field: "description",
    headerName: "Descrição",
    width: 300,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: DailyTrip) => {
      return data.line ? data.line.description : "N/A";
    },
  },
  {
    field: "locationOrig.code",
    headerName: "Origem/Destino",
    width: 300,
    sortable: false,
    filterable: false,
    valueGetter: (_, data) => {
      return data.line.locationOrig && data.line.locationDest
        ? `${data.line.locationOrig.code} / ${data.line.locationDest.code}`
        : "N/A";
    },
  },
  {
    field: "qtdLineSections",
    headerName: "Seções",
    width: 150,
    sortable: false,
    filterable: false,
  },
];

export function Lines() {
  const [hash, setHash] = useHash();
  const isOpen = hash.includes("line");
  const params = useSearchParams();
  const router = useRouter();

  const {
    lines,
    loadMoreLines,
    size,
    isLoading,
    isEmpty,
    error,
    totalCount,
    hasData,
  } = useLines();

  const showContent = params.get("tripDate");

  const handleCloseDialog = () => {
    setHash("");
  };

  // const handleAddTravel = () => {
  //   setHash("#lines");
  // };

  useEffect(() => {
    const newParams = new URLSearchParams();
    router.push(`/lines?${newParams.toString()}`);
  }, [params]);

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Cadastro de rotas</HeaderTitle>
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
        <LinesFilterBar />
        <Box display="flex" justifyContent="flex-end" mt="25px" mb="10px">
          <Button
            variant="outlined"
            size="small"
            onClick={() => console.log("adicionar viagens")}
          >
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
                  rows={lines}
                  getRowId={(row) => row.line.id}
                  localeText={{
                    noRowsLabel: "Nenhum registro encontrado",
                    columnMenuHideColumn: "Ocultar coluna",
                    columnsManagementShowHideAllText: "Mostrar/Ocultar todas",
                    columnMenuManageColumns: "Gerenciar colunas",
                    MuiTablePagination: {
                      labelRowsPerPage: "Registros por página",
                      labelDisplayedRows: ({ from, to, count }) =>
                        // eslint-disable-next-line prettier/prettier
                        `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`
                        }`,
                    },
                  }}
                  rowCount={totalCount}
                  columns={columns}
                  onCellDoubleClick={(params) => {
                    setHash(`#line-${params.row.line.id}`);
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: { page: size - 1, pageSize: 10 },
                    },
                  }}
                  onPaginationModelChange={(params) => {
                    loadMoreLines(params.page + 1);
                  }}
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
