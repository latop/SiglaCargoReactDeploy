import React from "react";
import { Controller, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import { Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@/components/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { useDailyTripsByPeriodFilterBar } from "./useDailyTripsByPeriodFilterBar";
import SearchIcon from "@mui/icons-material/Search";
import "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

export function DailyTripsByPeriodFilterBar(
  props: React.HTMLProps<HTMLFormElement>,
) {
  const { methods, onSubmit } = useDailyTripsByPeriodFilterBar();
  const { control, handleSubmit, watch } = methods;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="center"
            padding="20px 20px 0"
            spacing={1}
          >
            <Grid item xs={1.2}>
              <Controller
                name="startDate"
                rules={{ required: true }}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data de início"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.2}>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data de fim"
                    error={error?.message}
                    minDate={dayjs(watch("startDate"))}
                    {...field}
                  />
                )}
              />
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
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
