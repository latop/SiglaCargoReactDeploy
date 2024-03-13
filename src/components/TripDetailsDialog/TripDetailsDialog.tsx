import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import theme from "@/styles/theme";
import { useDriverSchedule } from "@/templates/DriversSchedule/useDriversSchedule";
import dayjs from "dayjs";
import { IJourneyForm, JourneyForm } from "@/components/JourneyForm";
import { useJourney } from "@/hooks/useJourney";
import { Box, CircularProgress, Typography, Button, Icon } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Journey, DriverJourneySchedule } from "@/interfaces/schedule";

const normalizeData = (data: Journey) => {
  const journeyDefaultValues: IJourneyForm = {
    status: data?.status || "",
    publishedDate: data?.publishedDate || "",
    awareDate: data?.awareDate || "",
    otmId: data?.otmId || "",
    presentationDate: data?.presentationDate || "",
    presentationDateActual: data?.presentationDateActual || "",
    cutoffDate: data?.cutoffDate || "",
    cutoffDateActual: data?.cutoffDateActual || "",
    notes: data?.notes || "",
    driverSchedules:
      data?.driverSchedules?.map((driverSchedule: DriverJourneySchedule) => ({
        type: driverSchedule?.type || "",
        task: driverSchedule?.task || "",
        locCodeOrig: driverSchedule?.locCodeOrig || "",
        locCodeDest: driverSchedule?.locCodeDest || "",
        lineCode: driverSchedule?.lineCode || "",
        licensePlate: driverSchedule?.licensePlate || "",
        startPlanned: driverSchedule?.startPlanned || "",
        endPlanned: driverSchedule?.endPlanned || "",
        startActual: driverSchedule?.startActual || "",
        endActual: driverSchedule?.endActual || "",
        new: false,
      })) || [],
  };
  return journeyDefaultValues;
};

export function TripDetailsDialog({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const methods = useForm();
  const {
    reset,
    formState: { defaultValues },
    watch,
    setValue,
  } = methods;
  const { trips } = useDriverSchedule();
  const currentTrip = trips?.find((trip) => trip.id === id);
  const { data, isLoading } = useJourney({
    driverId: currentTrip?.driverId,
    journeyDate: dayjs(currentTrip?.startPlanned).format("YYYY-MM-DD"),
  });

  React.useEffect(() => {
    if (data && !defaultValues) {
      reset(normalizeData(data));
    }
  }, [data, defaultValues]);

  const handleAddJourney = () => {
    const driverSchedules = watch("driverSchedules");
    driverSchedules.push({
      type: "",
      task: "",
      locCodeOrig: "",
      locCodeDest: "",
      lineCode: "",
      licensePlate: "",
      startPlanned: "",
      endPlanned: "",
      startActual: "",
      endActual: "",
      new: true,
    });
    setValue("driverSchedules", driverSchedules);
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth={false}
      PaperProps={{ sx: { height: "100%" } }}
    >
      <FormProvider {...methods}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Box display="flex" justifyContent="space-between">
            <Box>
              Circuito do motorista
              <Typography variant="body2">
                {currentTrip?.driverName} -{" "}
                {dayjs(currentTrip?.startPlanned).format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Box
              display="flex"
              gap="20px"
              alignItems="flex-end"
              paddingRight="40px"
            >
              <Box gap="5px" display="flex" flexDirection="column">
                <Typography variant="body2">
                  <strong>Status:</strong> {data?.status}
                </Typography>
                {data?.otmId && (
                  <Typography variant="body2">
                    <strong>OTM:</strong> {data?.otmId}
                  </Typography>
                )}
              </Box>

              {(data?.publishedDate || data?.awareDate) && (
                <Box gap="5px" display="flex" flexDirection="column">
                  {data?.publishedDate && (
                    <Typography variant="body2">
                      <strong>Publicado em:</strong>{" "}
                      {dayjs(data?.publishedDate).format("DD/MM/YYYY")}
                    </Typography>
                  )}
                  {data?.awareDate && (
                    <Typography variant="body2">
                      <strong>Avisado em:</strong>{" "}
                      {dayjs(data?.awareDate).format("DD/MM/YYYY")}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
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
            <Button
              variant="outlined"
              onClick={handleAddJourney}
              color="primary"
              size="small"
            >
              <Icon component={AddIcon} fontSize="small" />
              <Typography
                variant="body2"
                ml="5px"
                color={theme.palette.primary.main}
              >
                Adicionar jornada
              </Typography>
            </Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
