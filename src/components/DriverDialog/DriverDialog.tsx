import React, { useLayoutEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  //  CircularProgress
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useDriverDialog } from "./useDriverDialog";
import { DriverForm } from "./components/DriverForm";
import { DriverFormFooter } from "./components/DriverFormFooter/DriverFormFooter";

interface UpdateDriverDialogProps {
  open: boolean;
  onClose: () => void;
}

export function UpdateDriverDialog({ open, onClose }: UpdateDriverDialogProps) {
  const { methods, handleSubmit, isToUpdateDriver, isLoadingDriver } =
    useDriverDialog();

  useLayoutEffect(() => {
    if (!open) methods.reset({});
  }, [open, methods]);

  const handleClose = () => {
    methods.reset({});
    onClose();
  };

  const DialogHeader = () => {
    if (isToUpdateDriver) return "Atualizar Motorista";
    return "Adicionar Motorista";
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      PaperProps={{
        sx: { maxWidth: "1300px" },
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
              {isLoadingDriver ? (
                <Box
                  width={"100%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  padding={"1rem"}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <DriverForm />
              )}
            </DialogContent>
            <DriverFormFooter />
          </>
        </form>
      </FormProvider>
    </Dialog>
  );
}
