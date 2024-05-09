import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import { useToast } from "@/hooks/useToast";
import { DailyTripForm } from "./components/DailyTripForm";
import { Box, CircularProgress } from "@mui/material";
// import { FieldValues, FormProvider } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { useDailyTripDetailsDialog } from "./useDailyTripDetailsDialog";
// import { DailyTripFormFooter } from "./components/DailyTripFormFooter";
// import { DailyTrip } from "@/interfaces/daily-trip";

interface DailyTripDetailsProps {
  open: boolean;
  onClose: () => void;
}

export function DailyTripDetailsDialog({
  open,
  onClose,
}: DailyTripDetailsProps) {
  // const { addToast } = useToast();

  const onSubmit = () => {
    // createCircuit(data as DailyTrip, {
    //   onSuccess: () => {
    //     addToast("Circuito salvo com sucesso");
    //     onClose();
    //   },
    //   onError: () => {
    //     addToast("Erro ao salvar circuito", { type: "error" });
    //   },
    // });
  };

  const { dailyTripDetails, isLoading, methods } = useDailyTripDetailsDialog();
  const { formState } = methods;
  const { defaultValues } = formState;
  const loading = isLoading || (dailyTripDetails && !defaultValues?.id);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      PaperProps={{ sx: { height: "100%", maxWidth: "1400px" } }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <Box display="flex" justifyContent="space-between">
                Viagem diária
              </Box>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onClose}
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
              {loading && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  padding="10px"
                  height="100%"
                >
                  <CircularProgress />
                </Box>
              )}
              {!loading && <DailyTripForm />}
            </DialogContent>
            {/* <DailyTripFormFooter loading={isLoadingCreate} /> */}
          </>
        </form>
      </FormProvider>
    </Dialog>
  );
}
