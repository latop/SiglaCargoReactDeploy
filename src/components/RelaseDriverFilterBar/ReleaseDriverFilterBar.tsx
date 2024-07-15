import { Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import { AutocompleteDriver } from "../AutocompleteDriver";
import { AutocompleteLocation } from "../AutocompleteLocation";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useReleaseDriverFilterBar } from "./useRealeseDriverFilterBar";

export function ReleaseDriverFilterBar(
  props: React.HTMLProps<HTMLFormElement>,
) {
  const { methods, onSubmit } = useReleaseDriverFilterBar();
  const { control, handleSubmit } = methods;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          {...props}
          style={{
            width: "100%",
          }}
        >
          <Grid container gap={4} padding="20px 20px 20px 0">
            <Grid item xs={1.2}>
              <Controller
                name="dtRef"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <DatePicker label="Data de início" {...field} />
                )}
              />
            </Grid>

            <Grid item xs={1.1}>
              <Controller
                name="locOrig"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <AutocompleteLocation label="Origem" {...field} />
                  // error={error?.message}
                )}
              />
            </Grid>

            <Grid item xs={1.1}>
              <Controller
                name="demand"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth label="Demanda" {...field} />
                )}
              />
            </Grid>

            <Grid item xs={1.1}>
              <AutocompleteDriver />
            </Grid>

            <Grid item xs={1.1}>
              <Controller
                name="fleetCode"
                render={({ field }) => (
                  <TextField label="Cód da Frota" {...field} />
                )}
              />
            </Grid>

            <Grid item xs={0.5}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                fullWidth
              >
                <GridSearchIcon />
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
