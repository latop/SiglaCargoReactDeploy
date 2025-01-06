/* eslint-disable prettier/prettier */
"use client";

import { AppBar } from "@/components/AppBar";
import { DailyTripsFilterBar } from "./DailyTripsFilterBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { DailyTrip } from "@/interfaces/daily-trip";
import { FetchDailyTripsParams, initialDataDailyTripsParams, useGetDailyTripsQuery } from "@/services/query/daily-trips";
import { formatPlate } from "@/utils";
import { Box, Button, Card } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import IsLoadingTable from "./isLoadindCard";
import { EmptyResult } from "@/components/EmptyResult";
import { ErrorResult } from "@/components/ErrorResult";
import { DailyTripDetailsDialog } from "@/components/DailyTripDetailsDialog";
import { GenerateDailyTripDialog } from "@/components/GenerateDailyTripDialog";

const headerClass = 'blueColumnHeaders'
const columns: GridColDef[] = [
  {
    field: "tripDate",
    headerName: "Data da viagem",
    width: 150,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "",
  },
  {
    field: "sto",
    headerName: "Sto",
    width: 150,
    sortable: false,
    filterable: false,
  },
  {
    field: "flgStatus",
    headerName: "Status",
    width: 100,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value === 'C' ? 'CANCELADO' : "NORMAL",
  },
  {
    field: "endPlanned",
    headerName: "Chegada Prevista",
    width: 150,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "",
  },
  {
    field: "startPlanned",
    headerName: "Saída Prevista",
    width: 150,
    sortable: false,
    filterable: false,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "",
  },

  {
    field: "locationOrig.code",
    headerName: "Origem",
    width: 150,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: DailyTrip) => {
      return data.locationOrig ? data.locationOrig.code : "";
    },
  },
  {
    field: "locationDest.code",
    headerName: "Destino",
    width: 150,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: DailyTrip) => {
      return data.locationDest ? data.locationDest.code : "";
    },
  },
  {
    field: "tripType.code",
    headerName: "Tipo de viagem",
    width: 150,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: DailyTrip) => {
      return data.tripType ? data.tripType.code : "";
    },
  },
  {
    field: "licensePlateTrailer",
    headerName: "Placa",
    width: 150,
    sortable: false,
    filterable: false,
    valueGetter: (value) => {
      return formatPlate(value)
    },
  },

  {
    field: "lineCode",
    headerName: "Cód. Linha",
    width: 150,
    sortable: false,
    filterable: false,
    valueGetter: (_, data: DailyTrip) => {
      return data.line ? data.line.code : "";
    },
  },

  // {
  //   field: "fleetGroup.code",
  //   headerName: "Cód frota",
  //   width: 150,
  //   sortable: false,
  //   filterable: false,
  //   valueGetter: (_, data: DailyTrip) => {
  //     return data.fleetGroup ? data.fleetGroup.code : "";
  //   },
  // },



].map((column) => ({ ...column, headerClassName: headerClass }));

export function DailyTrips() {
  const [filters, setFilters] = useState<FetchDailyTripsParams>(initialDataDailyTripsParams)
  const [dailyTripModalIsOpen, setDailyTripModalIsOpen] = useState(false)
  const [generateDailyTripModalIsOpen, setGenerateDailyTripModalIsOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)

  const { data, isLoading, isError } = useGetDailyTripsQuery({ ...filters, pageNumber: currentPage + 1 });


  const handleFilters = (filtersData: FetchDailyTripsParams) => {
    setFilters(filtersData)
  }


  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Viagens diárias</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "1400px",
          height: "100%",
          padding: "15px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DailyTripsFilterBar onChange={handleFilters} />
        <Box
          display="flex"
          justifyContent="flex-end"
          mt="25px"
          mb="10px"
          gap={1}
        >
          <Button variant="outlined" size="small" onClick={() => setDailyTripModalIsOpen(true)}>
            Gerar viagem diária
          </Button>
          <Button variant="outlined" size="small" onClick={() => setGenerateDailyTripModalIsOpen(true)}>
            Adicionar viagem
          </Button>
        </Box>
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

          {!data || data.data.length === 0 && <EmptyResult />}
          {isError && <ErrorResult />}
          {isLoading && <IsLoadingTable />}
          {data && data.data.length > 0 &&
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                sx={{
                  width: '100%',
                  '& .blueColumnHeaders ': {
                    backgroundColor: '#24438F',
                    color: 'white'
                  },
                }}
                rows={data.data}
                localeText={{
                  noRowsLabel: "Nenhum registro encontrado",
                  columnMenuHideColumn: "Ocultar coluna",
                  columnsManagementShowHideAllText: "Mostrar/Ocultar todas",
                  columnMenuManageColumns: "Gerenciar colunas",
                  MuiTablePagination: {
                    labelRowsPerPage: "Registros por página",
                    labelDisplayedRows: ({ from, to, count }) =>
                      `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`
                      }`,
                  },
                }}
                columns={columns}
                // onCellDoubleClick={(params) => {
                //   setHash(`#dailyTrip-${params.row.id}`);
                // }}
                initialState={{
                  pagination: {
                    paginationModel: { page: data.currentPage - 1, pageSize: 10 },
                  },
                }}
                onPaginationModelChange={(params) => {
                  console.log('pagination', params)
                  setCurrentPage(params.page);
                }}
                paginationMode="server"
                rowCount={data.totalCount}
                pageSizeOptions={[10]}
                density="compact"
              />
            </div>}
        </Card>
      </Box>
      <DailyTripDetailsDialog open={dailyTripModalIsOpen} onClose={() => setDailyTripModalIsOpen(false)} />
      <GenerateDailyTripDialog isOpen={generateDailyTripModalIsOpen} onClose={() => setGenerateDailyTripModalIsOpen(false)} />
    </MainContainer >
  );
}
