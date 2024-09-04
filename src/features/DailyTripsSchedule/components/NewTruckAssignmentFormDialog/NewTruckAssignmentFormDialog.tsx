import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import { useNewTruckAssigment } from "./useNewTruckAssignment";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";
import CloseIcon from "@mui/icons-material/Close";

export const NewTruckAssingmentFormDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { methods, handleSubmit, loadingPostTruckAssignment } =
    useNewTruckAssigment();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Dialog onClose={onClose} open={isOpen} maxWidth="lg">
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Box display="flex" justifyContent="space-between">
            Atribuição de caminhão
            <Button
              type="submit"
              variant="text"
              color="inherit"
              onClick={onClose}
            >
              <CloseIcon sx={{ cursor: "pointer", opacity: 0.6 }} />
            </Button>
          </Box>
        </DialogTitle>
        <hr style={{ opacity: 0.2, marginBottom: 1 }} />
        <DialogContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
              <Grid container gap={1} rowGap={1.5}>
                <Controller
                  name={"dtRef"}
                  control={methods.control}
                  render={({ field }) => (
                    <Grid item>
                      <DatePicker label={"Data Ref."} {...field} />
                    </Grid>
                  )}
                />
                <Controller
                  name={"startTime"}
                  control={methods.control}
                  render={({ field }) => (
                    <Grid item>
                      <DatePicker label={"Começo"} {...field} />
                    </Grid>
                  )}
                />
                <Controller
                  name={"endTime"}
                  control={methods.control}
                  render={({ field }) => (
                    <Grid item>
                      <DatePicker label={"Fim"} {...field} />
                    </Grid>
                  )}
                />
                <Grid xs={3}>
                  <AutocompleteDriver name={"driverId"} />
                </Grid>
                <Grid xs={3}>
                  <AutocompleteTruck
                    name={"truckId"}
                    onChange={(value) =>
                      methods.setValue("truckId", value?.id || "")
                    }
                  />
                </Grid>
              </Grid>
              <hr style={{ opacity: 0.2, margin: "1rem 0" }} />
              <DialogActions>
                <Button
                  color="error"
                  variant="contained"
                  onClick={onClose}
                  disabled={loadingPostTruckAssignment}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loadingPostTruckAssignment}
                >
                  {loadingPostTruckAssignment ? (
                    <CircularProgress size={"26px"} color="inherit" />
                  ) : (
                    "Criar"
                  )}
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};
