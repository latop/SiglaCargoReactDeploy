"use client";

import { AppBar } from "@/components/AppBar";
import { DriversFilterBar } from "@/components/DriversFilterBar";
import { EmptyResult } from "@/components/EmptyResult";
import { ErrorResult } from "@/components/ErrorResult";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { UpdateDriverDialog } from "@/components/UpdateDriverDialog";
import { useDriversPaginated } from "@/hooks/useDrivers";
import { useHash } from "@/hooks/useHash";
import { Driver } from "@/interfaces/driver";
import { Box, Card, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

const columns: GridColDef[] = [
  {
    field: "nickName",
    headerName: "Nome",
    width: 400,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: Driver) => {
      return data.nickName ? data.nickName : "N/A";
    },
  },
  {
    field: "admission",
    headerName: "Data de Admissão",
    width: 200,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: Driver) => {
      return data.admission
        ? dayjs(data.admission).format("DD/MM/YYYY")
        : "N/A";
    },
  },
  {
    field: "integrationCode",
    headerName: "Cód. Integração",
    width: 200,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: Driver) => {
      return data.integrationCode ? data.integrationCode : "N/A";
    },
  },
];
export function Drivers() {
  const {
    drivers,
    error,
    isLoading,
    isEmpty,
    loadMoreLines,
    size,
    totalCount,
    hasData,
  } = useDriversPaginated();
  const [hash, setHash] = useHash();
  const match = (hash as string)?.match(/#driver-id-(.+)/);
  const driverId = match?.[1];
  const isUpdateDriverDialogOpen = !!driverId;

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
          gap: "16px",
        }}
      >
        <DriversFilterBar />
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
                rows={drivers}
                getRowId={(row) => row.id}
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
                  setHash(`#driver-id-${params.id}`);
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
      </Box>
      <UpdateDriverDialog
        open={isUpdateDriverDialogOpen}
        onClose={() => setHash("")}
      />
    </MainContainer>
  );
}
