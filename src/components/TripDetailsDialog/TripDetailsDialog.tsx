import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDriverSchedule } from "@/templates/DriversSchedule/useDriversSchedule";
import dayjs from "dayjs";
import { IJourneyForm, JourneyForm } from "@/components/JourneyForm";
import { useJourney } from "@/hooks/useJourney";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { IDriverJourneyForm } from "../DriverJourneyForm";

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
  const { reset } = methods;
  const { trips } = useDriverSchedule();
  const currentTrip = trips?.find((trip) => trip.id === id);
  const { isLoading } = useJourney(
    {
      driverId: currentTrip?.driverId,
      journeyDate: dayjs(currentTrip?.startPlanned).format("YYYY-MM-DD"),
    },
    {
      onSuccess: (data) => {
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
            data?.driverSchedules?.map(
              (driverSchedule: IDriverJourneyForm) => ({
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
              }),
            ) || [],
        };
        reset(journeyDefaultValues);
      },
    },
  );

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
          Circuito do motorista
          <Typography variant="body2">
            {currentTrip?.driverName} -{" "}
            {dayjs(currentTrip?.startPlanned).format("DD/MM/YYYY")}
          </Typography>
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
          <Box display="flex" justifyContent="flex-end" padding="10px 16px">
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
