import { Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import { AutocompleteDriver } from "../AutocompleteDriver";
import { AutocompleteLocation } from "../AutocompleteLocation";
import { AutocompleteFleetGroup } from "../AutocompleteFleetGroup";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useReleaseDriverFilterBar } from "./useRealeseDriverFilterBar";
import { useReleaseDriver } from "@/hooks/useReleaseDriver/useReleaseDriver";

export function ReleaseDriverFilterBar(
  props: React.HTMLProps<HTMLFormElement>,
) {
  const { data } = useReleaseDriver();
  const { methods, onSubmit } = useReleaseDriverFilterBar();
  const { control, handleSubmit } = methods;

  console.log(data);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Grid
            container
            alignItems="flex-start"
            gap={4}
            padding="20px 20px 0px"
          >
            <Grid item xs={1.2}>
              <Controller
                name="dtRef"
                rules={{ required: true }}
                control={control}
                render={({
                  field,

                  // fieldState: { error }
                }) => (
                  <DatePicker
                    label="Data de início"
                    // error={error?.message || ""}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={1.1}>
              <AutocompleteLocation name="locOrig" label="Origem" />
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
              <AutocompleteFleetGroup />
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
