import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import theme from "@/styles/theme";
import {
  IJourneyForm,
  JourneyForm,
} from "@/components/JourneyDetailsDialog/components/JourneyForm";
import { Box, CircularProgress, Typography, Button, Icon } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { Journey, DriverJourneySchedule } from "@/interfaces/schedule";
import { JourneyFormHeader } from "@/components/JourneyDetailsDialog/components/JourneyFormHeader";
import { useJourneyDetails } from "./useJourneyDetails";

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
  const { data, isLoading, methods, handleAddJourney } = useJourneyDetails(id);
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
      maxWidth={false}
      PaperProps={{ sx: { height: "100%" } }}
    >
      <FormProvider {...methods}>
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
