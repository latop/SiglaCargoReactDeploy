"use client";

import { AppBar } from "@/components/AppBar";
import { EmptyResult } from "@/components/EmptyResult";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { ReleaseDriverFilterBar } from "@/components/RelaseDriverFilterBar";
import { useReleaseDriver } from "@/hooks/useReleaseDriver/useReleaseDriver";
import { Box, Card, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "saida", headerName: "SAÍDA", width: 200 },
  { field: "entrega", headerName: "ENTREGA", width: 200 },
  { field: "demanda", headerName: "DEMANDA", width: 200 },
  { field: "destino", headerName: "DESTINO", width: 200 },
  { field: "motoristaPlan", headerName: "MOT.PLAN.", width: 200 },
  { field: "veiculoPlan", headerName: "VEÍCULO PLAN.", width: 200 },
  { field: "dtCheckList", headerName: "CHECK-LIST", width: 200 },
  { field: "motoristaLiberado", headerName: "MOT.REAL.", width: 200 },
  { field: "veiculoLiberado", headerName: "VEÍCULO.REAL.", width: 200 },
  { field: "dtLiberacao", headerName: "LIBERAÇÃO", width: 200 },
];

export function ReleaseDriver() {
  const { showContent, data, isLoading, isEmpty, origem } = useReleaseDriver();
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
                rows={data}
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
