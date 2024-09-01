import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import { useNewTruckAssigment } from "./useNewTruckAssignment";
import { Grid } from "@mui/material";

export const NewTruckAssingment = () => {
  const { methods } = useNewTruckAssigment();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form>
          <Controller
            name={"dtRef"}
            control={methods.control}
            render={({ field }) => (
              <Grid item>
                <DatePicker label={"Data Ref."} {...field} />
              </Grid>
            )}
          />
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
};
