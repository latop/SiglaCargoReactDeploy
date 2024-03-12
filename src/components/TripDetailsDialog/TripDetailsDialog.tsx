import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDriverSchedule } from "@/templates/DriversSchedule/useDriversSchedule";
import dayjs from "dayjs";
import { IJourneyForm, JourneyForm } from "../JourneyForm";
import { useJourney } from "@/hooks/useJourney";
import { Box, CircularProgress, Typography } from "@mui/material";

export function TripDetailsDialog({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const { trips } = useDriverSchedule();
  const currentTrip = trips?.find((trip) => trip.id === id);
  const { data, isLoading } = useJourney({
    driverId: currentTrip?.driverId,
    journeyDate: dayjs(currentTrip?.startPlanned).format("YYYY-MM-DD"),
  });

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
      data?.driverSchedules?.map((driverSchedule) => ({
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

  console.log(data?.driverSchedules);
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="none">
      <>
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
            >
              <CircularProgress />
            </Box>
          )}
          {!isLoading && (
            <>
              <JourneyForm defaultValues={journeyDefaultValues} />
            </>
          )}
        </DialogContent>
      </>
    </Dialog>
  );
}
