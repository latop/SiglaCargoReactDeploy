"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { ImportTripsFilterBar } from "@/components/ImportTripsFilterBar";
import { MainContainer } from "@/components/MainContainer";
import { useImportTrips } from "@/hooks/useImportTrips";
import { ImportTripsResponseItem } from "@/interfaces/import-trips";
import { Box, Card, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export function ImportTrips() {
  const columns: GridColDef[] = [
    {
      field: "FileName",
      headerName: "Nome do Arquivo",
      width: 300,
      valueGetter: (_, data: ImportTripsResponseItem) => {
        return data.FileName ? data.FileName.split(".xlsx")[0] : "N/A";
      },
    },
    {
      field: "LocationCode",
      headerName: "Cód. Loc",
      width: 100,
    },
    {
      field: "CreateAt",
      headerName: "Data criação",
      width: 200,
      valueGetter: (_, data: ImportTripsResponseItem) => {
        return dayjs(data.CreateAt).format("DD-MM-YY HH:mm");
      },
    },
  ];

  const { data, isLoading } = useImportTrips();

  const Content = () => {
    if (isLoading) return <CircularProgress />;
    if (data?.length)
      return (
        <DataGrid
          columns={columns}
          rows={data || []}
          getRowId={(row) => row.Id}
        />
      );
    return null;
  };

  return (
    <MainContainer>
      <AppBar style={{ display: "block" }}>
        <HeaderTitle>Importação de viagens</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          height: "100vh",
        }}
      >
        <ImportTripsFilterBar />
        <Card
          sx={{
            width: "100%",
            height: data?.length ? "calc(100% - 96px)" : "90%",
          }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Content />
          </Box>
        </Card>
      </Box>
    </MainContainer>
  );
}
