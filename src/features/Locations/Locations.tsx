"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { Box, Button, Card, CircularProgress } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  // GridDeleteForeverIcon
} from "@mui/x-data-grid";
import { EmptyResult } from "@/components/EmptyResult";
import { ErrorResult } from "@/components/ErrorResult";
import { useLocations } from "./useLocations";
import { Locations as LocationsType } from "@/interfaces/trip";
import { LocationsFilterBar } from "@/components/LocationsFilterBar/LocaticationsFilterBar";

export function Locations() {
  const {
    locations,
    currentPage,
    loadMoreLines,
    totalCount,
    isLoading,
    isEmpty,
    hasData,
    isError,
  } = useLocations();

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Cód. Localidade",
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "codeIntegration2",
      headerName: "Cód. TMS",
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Nome da Localidade",
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "locationType.code",
      headerName: "Tipo de Locatidade",
      width: 150,
      sortable: false,
      filterable: false,
      valueGetter: (_, data: LocationsType) => {
        return data.locationType.code;
      },
    },
    {
      field: "",
      headerName: "Ação",
      sortable: false,
      filterable: false,
      width: 50,

      // renderCell: (params) => {
      //   return (
      //     <button
      //       disabled={loadingDeleteTruck}
      //       style={{
      //         paddingTop: 12,
      //         display: "flex",
      //         gap: "8px",
      //         border: "none",
      //         background: "transparent",
      //       }}
      //     >
      //       <GridDeleteForeverIcon
      //         sx={{
      //           cursor: "pointer",
      //           color: "#e53935",
      //         }}
      //         onClick={() => {
      //           openDialog({
      //             body: "Deseja deletar este caminhão?",
      //             onConfirm: () => {
      //               handleDeleteTruck({ truckId: params?.id as string });
      //               closeDialog();
      //             },
      //             onCancel: () => {
      //               closeDialog();
      //             },
      //           });
      //         }}
      //       />
      //     </button>
      //   );
      // },
    },
  ];

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Caminhão</HeaderTitle>
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
        <LocationsFilterBar />
        <Button
          // onClick={handleAddTruck}
          variant="outlined"
          sx={{
            width: "170px",
            alignSelf: "flex-end",
          }}
        >
          Adicionar
        </Button>
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
          {isEmpty && !hasData && !isLoading && <EmptyResult />}
          {isError && !isLoading && <ErrorResult />}
          {hasData && !isEmpty && !isLoading && (
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={locations || []}
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
                // onRowDoubleClick={(params) => {
                //   handleEditTruck(params.id as string);
                // }}
                initialState={{
                  pagination: {
                    paginationModel: { page: currentPage - 1, pageSize: 10 },
                  },
                }}
                onPaginationModelChange={() => {
                  loadMoreLines();
                }}
                pageSizeOptions={[10]}
              />
            </div>
          )}
        </Card>
      </Box>
    </MainContainer>
  );
}
