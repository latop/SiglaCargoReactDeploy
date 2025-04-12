"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";
import { Controller, FormProvider } from "react-hook-form";
import { useFleetModelDialog } from "./useFleetModelDialog";
import { AutocompleteFleetBrand } from "../AutocompleteFleetBrand";

interface FleetModelDialogProps {
  open: boolean;
  onClose: () => void;
}

export function FleetModelDialog({ open, onClose }: FleetModelDialogProps) {
  const { fleetModelId, methods, isLoading, handleSubmit } =
    useFleetModelDialog();

  const handleClose = () => {
    methods.reset({});
    onClose();
  };

  const DialogHeader = () => {
    if (fleetModelId) return "Atualizar Modelo de Frota";
    return "Adicionar Modelo de Frota";
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      PaperProps={{
        sx: { maxWidth: "1000px" },
      }}
    >
      <FormProvider {...methods}>
        <form
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
          onSubmit={handleSubmit}
        >
          <DialogTitle
            sx={{ m: 0, p: "1rem 1rem" }}
            id="customized-dialog-title"
          >
            <Box display="flex" justifyContent="space-between">
              <DialogHeader />
            </Box>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ padding: "16px" }}>
            {isLoading ? (
              <Box
                height={"100%"}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Grid container gap={1.5}>
                <Grid item xs={6}>
                  <Controller
                    control={methods.control}
                    name="name"
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                          field.onChange(e.target.value.toUpperCase());
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={methods.control}
                    name="code"
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        label="Código"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                          field.onChange(e.target.value.toUpperCase());
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteFleetBrand name="fleetBrand.code" />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ padding: "16px" }}>
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#24438F" }}
            >
              Salvar
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
