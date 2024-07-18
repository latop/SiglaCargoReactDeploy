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
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";

export function ReleaseDriver() {
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
      ),
    },
    {
      field: "dtCheckList",
      headerName: "CHECK-LIST",
      width: 100,
      renderCell: (params) => {
        const hasDtCheckList =
          params?.row.dtCheckList !== undefined &&
          params?.row.dtCheckList !== null;
        if (hasDtCheckList) return <FaCheck fill="green" />;
        else return <FaTimes fill="red" />;
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

  const {
    showContent,
    drivers,
    isLoading,
    isEmpty,
    origem,
    totalCount,
    error,
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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          width: "80%",
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
          {(isEmpty || error) && <EmptyResult />}
          {showContent && (
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={drivers}
                columns={columns}
                rowCount={totalCount}
                getRowId={(params) => params.dailyTripSectionId}
                onPaginationModelChange={(params) => {
                  loadMore(params.page + 1);
                }}
                onCellDoubleClick={(params) =>
                  handleOpenDialog(params.row.dailyTripSectionId)
                }
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
      <ReleaseDriverDialog open={!!isOpen} onClose={handleCloseDialog} />
    </MainContainer>
  );
}
