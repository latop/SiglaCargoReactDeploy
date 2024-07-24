import { Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import { AutocompleteDriver } from "../AutocompleteDriver";
import { AutocompleteLocation } from "../AutocompleteLocation";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useReleaseDriverFilterBar } from "./useRealeseDriverFilterBar";
import { AutocompleteFleetGroup } from "../AutocompleteFleetGroup";

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
          style={{ width: "100%" }}
          {...props}
        >
          <Grid container padding="20px 20px 20px 0" spacing={1} width={"100%"}>
            <Grid item xs={1.3}>
              <Controller
                name="dtRef"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <DatePicker label="Data de início" {...field} />
                )}
              />
            </Grid>

            <Grid item xs={2}>
              <AutocompleteLocation label="Origem" name="locOrig" />
            </Grid>

            <Grid item xs={2}>
              <Controller
                name="demand"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth label="Demanda" {...field} />
                )}
              />
            </Grid>

            <Grid item xs={2}>
              <Controller
                name="nickName"
                control={control}
                render={({ field }) => <AutocompleteDriver {...field} />}
              />
            </Grid>

            <Grid item xs={2}>
              <Controller
                name="fleetCode"
                control={control}
                render={({ field }) => <AutocompleteFleetGroup {...field} />}
              />
            </Grid>

            <Grid item xs={0.5} marginLeft={"auto"}>
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
