import React from "react";
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "@/hooks/useToast";
import { Box, CircularProgress } from "@mui/material";
import { FieldValues, FormProvider } from "react-hook-form";
import { useVehiclePlanningDetailsDialog } from "./useVehiclePlanningDetailsDialog";
import { useVehiclePlanningDetails } from "@/hooks/useVehiclePlanningDetails";
import { VehiclePlanningForm } from "./components/VehiclePlanningForm";
import { VehiclePlanningFormFooter } from "./components/VehiclePlanningFormFooter";
import { useVehiclePlannings } from "@/hooks/useVehiclePlannings";

interface VehiclePlanningDetailsProps {
  open: boolean;
  onClose: () => void;
}

export function VehiclePlanningDetailsDialog({
  open,
  onClose,
}: VehiclePlanningDetailsProps) {
  const { addToast } = useToast();

  const { updateVehiclePlanning, createVehiclePlanning } =
    useVehiclePlanningDetails();
  const { refetch } = useVehiclePlannings();
  const { vehiclePlanningDetails, isLoading, methods } =
    useVehiclePlanningDetailsDialog();

  const onSubmit = async (data: FieldValues) => {
    if (vehiclePlanningDetails) {
      await handleUpdate(data);
    } else {
      await handleCreate(data);
    }
  };

  const handleUpdate = async (data: FieldValues) => {
    const body = {
      id: vehiclePlanningDetails?.id,
      driverId: data.driver?.id,
      truckId: data.truck?.id,
      startTime: data.startTime,
      endTime: data.endTime,
      freqFri: data.freqFri ? 1 : 0,
      freqMon: data.freqMon ? 1 : 0,
      freqSat: data.freqSat ? 1 : 0,
      freqSun: data.freqSun ? 1 : 0,
      freqThu: data.freqThu ? 1 : 0,
      freqTue: data.freqTue ? 1 : 0,
      freqWed: data.freqWed ? 1 : 0,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    await updateVehiclePlanning(body, {
      onSuccess: () => {
        addToast("Viagem salva com sucesso");
        refetch();
        onClose();
      },
      onError: () => {
        addToast("Erro ao salvar viagem", { type: "error" });
      },
    });
  };

  const handleCreate = async (data: FieldValues) => {
    const body = {
      driverId: data.driver?.id,
      truckId: data.truck?.id,
      startTime: data.startTime,
      endTime: data.endTime,
      freqFri: data.freqFri ? 1 : 0,
      freqMon: data.freqMon ? 1 : 0,
      freqSat: data.freqSat ? 1 : 0,
      freqSun: data.freqSun ? 1 : 0,
      freqThu: data.freqThu ? 1 : 0,
      freqTue: data.freqTue ? 1 : 0,
      freqWed: data.freqWed ? 1 : 0,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    await createVehiclePlanning(body, {
      onSuccess: () => {
        addToast("Viagem criada com sucesso");
        refetch();
        onClose();
      },
      onError: () => {
        addToast("Erro ao criar viagem", { type: "error" });
      },
    });
  };

  const { formState } = methods;
  const { defaultValues } = formState;
  const loading = isLoading || (vehiclePlanningDetails && !defaultValues?.id);

  const handleClose = () => {
    onClose();
    methods.reset({
      id: "",
      driver: null,
      startTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      endTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      freqTue: false,
      freqWed: false,
      freqThu: false,
      freqFri: false,
      freqSat: false,
      freqSun: false,
      freqMon: false,
    });
  };
  const { handleSubmit } = methods;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      PaperProps={{ sx: { height: "100%", maxWidth: "1400px" } }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <Box display="flex" justifyContent="space-between">
                Planejamento de veículo
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
              {!loading && <VehiclePlanningForm />}
            </DialogContent>
            <VehiclePlanningFormFooter />
          </>
        </form>
      </FormProvider>
    </Dialog>
  );
}
