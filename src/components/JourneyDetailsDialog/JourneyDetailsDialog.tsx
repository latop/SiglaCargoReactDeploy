import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import theme from "@/styles/theme";
import { useToast } from "@/hooks/useToast";
import { usePost } from "@/hooks/usePost";
import { JourneyForm } from "@/components/JourneyDetailsDialog/components/JourneyForm";
import { Box, CircularProgress, Typography, Button, Icon } from "@mui/material";
import { FieldValues, FormProvider } from "react-hook-form";
import { TaskDriver, CircuitJourney } from "@/interfaces/schedule";
import { JourneyFormHeader } from "@/components/JourneyDetailsDialog/components/JourneyFormHeader";
import { useJourneyDetails } from "./useJourneyDetails";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useDailyTripsUnallocated } from "@/hooks/useDailyTripsUnallocated";

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
  id: string;
  onClose: () => void;
}

export function JourneyDetailsDialog({
  open,
  id,
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
      },
      onError: () => {
        addToast("Erro ao salvar circuito", { type: "error" });
      },
    });
  };

  const { data, isLoading, methods, handleAddTravel, handleAddActivity } =
    useJourneyDetails(id);
  const { reset, formState } = methods;
  const { defaultValues } = formState;

  React.useEffect(() => {
    if (data && !defaultValues) {
      reset(normalizeData(data));
    }
  }, [data, defaultValues]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      PaperProps={{ sx: { height: "100%", maxWidth: "1050px" } }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <JourneyFormHeader id={id} />
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
            <DialogContent dividers>
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
              {!isLoading && (
                <>
                  <JourneyForm />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Box
                display="flex"
                justifyContent="space-between"
                padding="10px 16px"
                width="100%"
              >
                <Box display="flex" gap="10px">
                  <Button
                    variant="outlined"
                    onClick={handleAddTravel}
                    color="primary"
                    size="small"
                  >
                    <Icon component={AddIcon} fontSize="small" />
                    <Typography
                      variant="body2"
                      ml="5px"
                      color={theme.palette.primary.main}
                    >
                      Viagem
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleAddActivity}
                    color="primary"
                    size="small"
                  >
                    <Icon component={AddIcon} fontSize="small" />
                    <Typography
                      variant="body2"
                      ml="5px"
                      color={theme.palette.primary.main}
                    >
                      Atividade
                    </Typography>
                  </Button>
                </Box>
                <Box display="flex" gap="10px">
                  {/* <Button variant="contained" color="error">
                    Desassociar motorista
                  </Button> */}
                  <Button type="submit" variant="contained">
                    {loading && (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ margin: "0px 11.45px" }}
                      />
                    )}
                    {!loading && `Salvar`}
                  </Button>
                </Box>
              </Box>
            </DialogActions>
          </>
        </form>
      </FormProvider>
    </Dialog>
  );
}
