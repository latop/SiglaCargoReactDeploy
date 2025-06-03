"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { ImportTripsFilterBar } from "@/components/ImportTripsFilterBar";
import { MainContainer } from "@/components/MainContainer";
import { useImportTrips } from "@/hooks/useImportTrips";
import { Box, Button, Card } from "@mui/material";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";

import { EmptyResult } from "@/components/EmptyResult";
import { ImportTripsDialog } from "@/components/ImportTripsDialog/ImportTripsDialog";
import { ImportTripsCheckDialog } from "@/components/ImportTripsCheckDialog/ImportTripsCheckDialog";
import { useCallback, useState } from "react";
import { columnsConfig } from "./columnsConfig";
import LoadingTableSkeleton from "@/components/LoadingTableSkeleton/LoadingTableSkeleton";

export function ImportTrips() {
  const {
    data,
    isLoading,
    hasParamsToSearch,
    handleDeleteDemand,
    importedTripId,
    handleImportedTrip,
    handleCloseDialog,
  } = useImportTrips();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setOpenDialog((prev) => !prev);
  }, [setOpenDialog]);

  const columns = columnsConfig({
    handleImportedTrip,
    handleDeleteDemand,
  });

  const Content = () => {
    if (isLoading && hasParamsToSearch)
      return <LoadingTableSkeleton length={15} />;
    if (data?.length)
      return (
        <DataGrid
          columns={columns}
          rows={data || []}
          getRowId={(row) => row.Id}
          density="compact"
          initialState={{
            pagination: {
              paginationModel: { pageSize: 15 },
            },
          }}
          onCellDoubleClick={(params) =>
            handleImportedTrip(params.id as string)
          }
        />
      );
    if (!data?.length) return <EmptyResult />;
  };

  return (
    <MainContainer
      sx={{
        overflow: "hidden",
      }}
    >
      <AppBar style={{ display: "block" }}>
        <HeaderTitle>Importação de viagens</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          minHeight: "790px",
          height: "auto",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={2}
          justifyContent={"space-between"}
          minHeight={"64px"}
          alignItems={"flex-start"}
        >
          <ImportTripsFilterBar />
          {/* <UploadTripFileForm /> */}
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => setOpenDialog(true)}
          >
            Importar Viagem
            <GridAddIcon fontSize="small" />
          </Button>
        </Box>

        <Card
          sx={{
            width: "100%",
            height: data?.length ? "calc(100% - 116px)" : "90%",
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
      <ImportTripsDialog open={!!importedTripId} onClose={handleCloseDialog} />
      <ImportTripsCheckDialog open={openDialog} onClose={handleOpenDialog} />
    </MainContainer>
  );
}
