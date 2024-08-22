import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useImportTripsFilterBar } from "./useImportTripsFilterBar";

export function ImportTripsFilterBar(props: React.HTMLProps<HTMLFormElement>) {
  const { methods, onSubmit } = useImportTripsFilterBar();
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
                name="startDate"
                rules={{ required: true }}
                control={control}
                render={({ field }) => <DatePicker label="Início" {...field} />}
              />
            </Grid>
            <Grid item xs={1.3}>
              <Controller
                name="endDate"
                rules={{ required: true }}
                control={control}
                render={({ field }) => <DatePicker label="Fim" {...field} />}
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
