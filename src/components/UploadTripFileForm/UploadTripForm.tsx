"use client";
import { Button, Grid, Input } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { CSSProperties } from "react";
import { FormProvider } from "react-hook-form";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";
import { useImportTrips } from "@/hooks/useImportTrips";
import { ClearIcon } from "@mui/x-date-pickers";
import { GridAddIcon } from "@mui/x-data-grid";

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
};

export function UploadTripFileForm() {
  const {
    formMethods,
    onSubmit,
    handleFileChange,
    selectedFile,
    currentFile,
    handleClearFile,
  } = useImportTrips();

  const ButtonFileActions = () => {
    if (currentFile)
      return (
        <Button
          onClick={handleClearFile}
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <p
            style={{
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentFile}
          </p>
          <ClearIcon fontSize="inherit" />
        </Button>
      );
    return (
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
          Importar Viagem
          <GridAddIcon fontSize="inherit" />
        </label>
      </Button>
    );
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid
          container
          gap={1}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Grid item>
            <ButtonFileActions />
          </Grid>
          <Grid item>
            {selectedFile && (
              <AutocompleteLocationGroup name="Locationcode" label="Cód. Loc" />
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
  );
}
