import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "@/hooks/useToast";
import { usePost } from "@/hooks/usePost";
import { JourneyForm } from "@/components/JourneyDetailsDialog/components/JourneyForm";
import { Box, CircularProgress } from "@mui/material";
import { FieldValues, FormProvider } from "react-hook-form";
import { TaskDriver, CircuitJourney } from "@/interfaces/schedule";
import { JourneyFormHeader } from "@/components/JourneyDetailsDialog/components/JourneyFormHeader";
import { useJourneyDetails } from "./useJourneyDetails";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useDailyTripsUnallocated } from "@/hooks/useDailyTripsUnallocated";
import { JourneyFormFooter } from "./components/JourneyFormFooter";

const normalizeData = (data: CircuitJourney) => {
  const journeyDefaultValues = {
    circuitJourneyId: data.circuitJourneyId,
    driverId: data.driverId,
    nickName: data.nickName,
    driverBase: data.driverBase,
    driverSubBase: data.driverSubBase,
    fleetCode: data.fleetCode,
    startDate: data?.startDate,
    endDate: data?.endDate,
    otmProcess: data?.otmProcess || "",
    tasksDriver:
      data?.tasksDriver?.map((taskDriver: TaskDriver) => ({
        seq: taskDriver.seq,
        demand: taskDriver?.demand || null,
        lineCode: taskDriver?.lineCode || null,
        type: taskDriver.type || (taskDriver?.activityCode ? "A" : "V"),
        activityId: taskDriver?.activityId || null,
        activityCode: taskDriver?.activityCode || null,
        locOrig: taskDriver?.locOrig || null,
        locDest: taskDriver?.locDest || null,
        startPlanned: taskDriver?.startPlanned || null,
        endPlanned: taskDriver?.endPlanned || null,
        lineId: taskDriver?.lineId || null,
        startActual: taskDriver?.startActual || null,
        endActual: taskDriver?.endActual || null,
      })) || [],
  };
  return journeyDefaultValues;
};

interface JourneyDetailsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function JourneyDetailsDialog({
  open,
  onClose,
}: JourneyDetailsDialogProps) {
  const [postCircuit, { loading }] = usePost();
  const { refetch: refetchJourneys } = useJourneysByPeriod();
  const { refetch: refetchDailyTrips } = useDailyTripsUnallocated();
  const { addToast } = useToast();

  const onSubmit = (data: FieldValues) => {
    postCircuit("/gantt/UpdateCircuit", data, {
      onSuccess: () => {
        addToast("Circuito salvo com sucesso");
        refetchJourneys();
        refetchDailyTrips();
        onClose();
      },
      onError: () => {
        addToast("Erro ao salvar circuito", { type: "error" });
      },
    });
  };

  const { data, isLoading, methods } = useJourneyDetails();
  const { reset, formState } = methods;
  const { defaultValues } = formState;

  useEffect(() => {
    if (data && !defaultValues) {
      reset(normalizeData(data));
    }
  }, [data, defaultValues]);

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
              <JourneyFormHeader />
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
              {isLoading && (
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
              {!isLoading && <JourneyForm />}
            </DialogContent>
            <JourneyFormFooter loading={loading} />
          </>
        </form>
      </FormProvider>
    </Dialog>
  );
}
