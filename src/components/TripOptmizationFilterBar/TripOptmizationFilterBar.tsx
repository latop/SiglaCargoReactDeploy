import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTripOptmizationFilterBar } from "@/hooks/useTripOptmizationFilterBar";
import { AutocompleteLocationGroup } from "../AutocompleteLocationGroup";
import { useTripOptmization } from "@/hooks/useTripOptmization";

export function TripOptmizationFilterBar(
  props: React.HTMLProps<HTMLFormElement>,
) {
  const { methods, onSubmit } = useTripOptmizationFilterBar();
  const { control, handleSubmit } = methods;
  const { mutate, optmizedTrips, isLoading, handleOptmize } =
    useTripOptmization();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Grid container gap={1}>
            <Grid item xs={3}>
              <Controller
                name="start"
                rules={{ required: true }}
                control={control}
                render={({ field }) => <DatePicker label="Início" {...field} />}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="end"
                rules={{ required: true }}
                control={control}
                render={({ field }) => <DatePicker label="Fim" {...field} />}
              />
            </Grid>
            <Grid item xs={2}>
              <AutocompleteLocationGroup label="Cód. Loc" />
            </Grid>

            <Grid item xs={2}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                onClick={handleOptmize}
              >
                Otimizar
                <SettingsIcon fontSize="inherit" sx={{ ml: "5px" }} />
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={() => mutate(optmizedTrips)}
                size="large"
                variant="contained"
                color="primary"
              >
                {isLoading ? (
                  "Carregando..."
                ) : (
                  <>
                    Atualizar
                    <RefreshIcon fontSize="inherit" sx={{ ml: "5px" }} />
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
