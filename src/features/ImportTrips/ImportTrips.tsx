"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { ImportTripsFilterBar } from "@/components/ImportTripsFilterBar";
import { MainContainer } from "@/components/MainContainer";
import { useImportTrips } from "@/hooks/useImportTrips";
import { ImportTripsResponseItem } from "@/interfaces/import-trips";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Input,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import { CSSProperties } from "react";
import { FormProvider } from "react-hook-form";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
};

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

  const {
    data,
    isLoading,
    handleFileChange,
    formMethods,
    onSubmit,
    selectedFile,
    currentFile,
  } = useImportTrips();

  const RenderButtonText = () => {
    if (currentFile)
      return (
        <>
          {currentFile}
          <ClearIcon fontSize="inherit" />
        </>
      );
    return (
      <>
        Importar Viagem
        <AddIcon fontSize="inherit" />
      </>
    );
  };

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
          height: "100vh",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={2}
          paddingBottom={"20px"}
          justifyContent={"space-between"}
        >
          <ImportTripsFilterBar />

          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Grid
                container
                gap={1}
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                <Grid item>
                  <Button color="primary" variant="outlined">
                    <label style={labelStyle}>
                      <Input
                        type="file"
                        sx={{ display: "none" }}
                        inputProps={{ accept: ".xlsx" }}
                        {...formMethods.register("File", {
                          onChange: handleFileChange,
                        })}
                      />
                      <RenderButtonText />
                    </label>
                  </Button>
                </Grid>
                <Grid item>
                  {selectedFile && (
                    <AutocompleteLocationGroup
                      name="Locationcode"
                      label="Cód. Loc"
                    />
                  )}
                </Grid>

                <Grid item>
                  {selectedFile && (
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                    >
                      <UploadIcon />
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </FormProvider>
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
    </MainContainer>
  );
}
