import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDriverSchedule } from "@/templates/DriversSchedule/useDriversSchedule";
import dayjs from "dayjs";
import { DriverJourneyForm } from "../DriverJourneyForm";
import { useJourney } from "@/hooks/useJourney";
import { Box, CircularProgress } from "@mui/material";

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
    journeyDate: currentTrip?.startPlanned,
  });

  const defaultValues = {
    status: data?.status || "",
    publishedDate: data?.publishedDate || "",
    awareDate: data?.awareDate || "",
    otmId: data?.otmId || "",
    presentationDate: data?.presentationDate || "",
    presentationDateActual: data?.presentationDateActual || "",
    cutoffDate: data?.cutoffDate || "",
    cutoffDateActual: data?.cutoffDateActual || "",
    notes: data?.notes || "",
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg" sx={{ height: "70vh" }}>
      <>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Circuito do motorista {currentTrip?.driverName} -{" "}
          {dayjs(currentTrip?.startPlanned).format("DD/MM/YYYY")}
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
          {!isLoading && <DriverJourneyForm defaultValues={defaultValues} />}
        </DialogContent>
      </>
    </Dialog>
  );
}
