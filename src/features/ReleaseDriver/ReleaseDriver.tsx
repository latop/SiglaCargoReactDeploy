"use client";

import { AppBar } from "@/components/AppBar";
import { EmptyResult } from "@/components/EmptyResult";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import { ReleaseDriverFilterBar } from "@/components/RelaseDriverFilterBar";
import { ReleaseDriverDialog } from "@/components/ReleaseDriverDialog/ReleaseDriverDialog";
import { useHash } from "@/hooks/useHash";
import { useReleaseDriver } from "@/hooks/useReleaseDriver/useReleaseDriver";
import { ReleaseDriverInterface } from "@/interfaces/release-driver";
import { Box, Card, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";

export function ReleaseDriver() {
  const columns: GridColDef[] = [
    {
      field: "saida",
      headerName: "SAÍDA",
      width: 150,
      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.saida ? data.saida : "N/A";
      },
    },
    {
      field: "entrega",
      headerName: "ENTREGA",
      width: 150,
      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.entrega ? data.entrega : "N/A";
      },
    },
    {
      field: "demanda",
      headerName: "DEMANDA",
      width: 150,

      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.demanda ? data.demanda : "N/A";
      },
    },
    {
      field: "destino",
      headerName: "DESTINO",
      width: 150,
      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.destino ? data.destino : "N/A";
      },
    },
    {
      field: "motoristaPlan",
      headerName: "MOT.PLAN.",
      width: 150,
      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.motoristaPlan ? data.motoristaPlan : "N/A";
      },
    },
    {
      field: "veiculoPlan",
      headerName: "VEÍCULO PLAN.",
      width: 150,
      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.veiculoPlan ? data.veiculoPlan : "N/A";
      },
    },
    {
      field: "dtCheckList",
      headerName: "CHECK-LIST",
      width: 70,
      renderCell: (params) => {
        if (
          params.row.dtCheckList === null ||
          params.row.dtCheckList === undefined
        )
          return (
            <IconButton
              onClick={() => handleOpenDialog(params.row.dailyTripSectionId)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              <FaEdit />
            </IconButton>
          );
        return params.row.dtCheckList;
      },
    },

    {
      field: "motoristaLiberado",
      headerName: "MOT.REAL.",
      width: 150,
      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.motoristaLiberado ? data.motoristaLiberado : "N/A";
      },
    },
    {
      field: "veiculoLiberado",
      headerName: "VEÍCULO.REAL.",
      width: 150,
      valueGetter: (_, data: ReleaseDriverInterface) => {
        return data.veiculoLiberado ? data.veiculoLiberado : "N/A";
      },
    },
    {
      field: "dtLiberacao",
      headerName: "LIBERAÇÃO",
      width: 100,
      renderCell: (params) => {
        if (
          (params.row.motoristaLiberado === null ||
            params.row.motoristaLiberado === undefined) &&
          (params.row.veiculoLiberado === null ||
            params.row.veiculoLiberado === undefined)
        )
          return "N/A";
        return (
          <IconButton
            onClick={() => console.log("esperando api")}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "black",
              cursor: "pointer",
            }}
          >
            <FaEdit />
          </IconButton>
        );
      },
    },
  ];

  const {
    showContent,
    drivers,
    isLoading,
    // isEmpty,
    origem,
    totalCount,
    // error,
    size,
    loadMore,
  } = useReleaseDriver();
  const router = useRouter();
  const params = useSearchParams();

  const [hash, setHash] = useHash();

  const handleOpenDialog = (id: string) => {
    setHash(`#releaseDriverId-${id}`);
  };

  const handleCloseDialog = () => {
    setHash("");
  };

  const isOpen = hash.includes("releaseDriverId");

  useEffect(() => {
    if (!params.get("dtRef") || !params.get("locOrig")) {
      const newParams = new URLSearchParams();
      newParams.append("dtRef", dayjs().format("YYYY-MM-DD"));
      newParams.append("locOrig", "");
      router.push(`/release-driver?${newParams.toString()}`);
    }
  }, [params]);

  return (
    <MainContainer>
      <AppBar style={{ display: "block" }}>
        <HeaderTitle>Liberação de motoristas para viagens</HeaderTitle>
      </AppBar>

      <Box
        sx={{
          width: "1400px",
          height: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ReleaseDriverFilterBar />
        <Box
          sx={{
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
            height: "90%",
            margin: "10px auto 20px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading && <CircularProgress />}
          {drivers.length === 0 && <EmptyResult />}
          {showContent && !isLoading && (
            <Box sx={{ height: "100%", width: "100%", overflowY: "auto" }}>
              <DataGrid
                rows={drivers}
                columns={columns}
                rowCount={totalCount}
                getRowId={(params) => params.dailyTripSectionId}
                onPaginationModelChange={(params) => {
                  loadMore(params.page + 1);
                }}
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
                onCellDoubleClick={(params) => {
                  setHash(`#vehiclePlanning-${params.row.id}`);
                }}
                initialState={{
                  pagination: {
                    paginationModel: { page: size - 1, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10]}
              />
            </Box>
          )}
        </Card>
      </Box>
      <ReleaseDriverDialog open={!!isOpen} onClose={handleCloseDialog} />
    </MainContainer>
  );
}
