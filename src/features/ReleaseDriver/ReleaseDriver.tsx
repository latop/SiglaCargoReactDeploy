"use client";

import { AppBar } from "@/components/AppBar";
import { EmptyResult } from "@/components/EmptyResult";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { ReleaseDriverFilterBar } from "@/components/RelaseDriverFilterBar";
import { useReleaseDriver } from "@/hooks/useReleaseDriver/useReleaseDriver";
import { ReleaseDriverInterface } from "@/interfaces/release-driver";
import { Box, Card, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";

const columns: GridColDef[] = [
  {
    field: "saida",
    headerName: "SAÍDA",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.saida ? data.saida : "N/A";
    },
  },
  {
    field: "entrega",
    headerName: "ENTREGA",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.entrega ? data.entrega : "N/A";
    },
  },
  {
    field: "demanda",
    headerName: "DEMANDA",
    width: 200,

    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.demanda ? data.demanda : "N/A";
    },
  },
  {
    field: "destino",
    headerName: "DESTINO",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.destino ? data.destino : "N/A";
    },
  },
  {
    field: "motoristaPlan",
    headerName: "MOT.PLAN.",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.motoristaPlan ? data.motoristaPlan : "N/A";
    },
  },
  {
    field: "veiculoPlan",
    headerName: "VEÍCULO PLAN.",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.veiculoPlan ? data.veiculoPlan : "N/A";
    },
  },
  {
    field: "action",
    headerName: "AÇÃO",
    width: 100,
    renderCell: (params) => (
      <button
        onClick={() => handleEdit(params.row.dailyTripSectionId)}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "black",
          cursor: "pointer",
        }}
      >
        <FaEdit />
      </button>
    ),
  },
  {
    field: "dtCheckList",
    headerName: "CHECK-LIST",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.dtCheckList ? data.dtCheckList : "N/A";
    },
  },
  {
    field: "motoristaLiberado",
    headerName: "MOT.REAL.",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.motoristaLiberado ? data.motoristaLiberado : "N/A";
    },
  },
  {
    field: "veiculoLiberado",
    headerName: "VEÍCULO.REAL.",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.veiculoLiberado ? data.veiculoLiberado : "N/A";
    },
  },
  {
    field: "dtLiberacao",
    headerName: "LIBERAÇÃO",
    width: 200,
    valueGetter: (_, data: ReleaseDriverInterface) => {
      return data.dtLiberacao ? data.dtLiberacao : "N/A";
    },
  },
];

const handleEdit = (id: string) => {
  console.log(`Editando registro com ID: ${id}`);
};

export function ReleaseDriver() {
  const { showContent, drivers, isLoading, isEmpty, origem } =
    useReleaseDriver();
  return (
    <MainContainer>
      <AppBar style={{ display: "block" }}>
        <HeaderTitle>Liberação de motoristas para viagens</HeaderTitle>
      </AppBar>

      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          width: "80%",
          maxWidth: "1400px",
        }}
      >
        <ReleaseDriverFilterBar />
        <Box
          style={{
            width: "100%",
            alignSelf: "flex-start",
            padding: "10px 0",
          }}
        >
          <strong>ORIGEM:</strong> {origem}
        </Box>
        <Card
          sx={{
            width: "100%",
            height: "calc(100% - 30px)",
            margin: "10px auto 20px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading && <CircularProgress />}
          {isEmpty && <EmptyResult />}

          {showContent && (
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={drivers}
                columns={columns}
                getRowId={(row) => row.dailyTripSectionId}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 100 },
                  },
                }}
                pageSizeOptions={[100]}
              />
            </div>
          )}
        </Card>
      </Box>
    </MainContainer>
  );
}
