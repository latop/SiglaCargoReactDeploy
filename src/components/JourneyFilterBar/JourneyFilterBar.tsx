import React from "react";
import { Controller, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import { Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@/components/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompletePosition } from "@/components/AutocompletePosition";
import { useJourneyFilterBar } from "./useJourneyFilterBar";
import "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

export function JourneyFilterBar() {
  const { methods, onSubmit } = useJourneyFilterBar();
  const { control, handleSubmit, watch, formState } = methods;
  console.log(formState.errors);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            xs={12}
            alignItems="flex-start"
            spacing={2}
            sx={{
              margin: "20px 0",
            }}
          >
            <Grid item xs={1.5}>
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
            <Grid item xs={1.5}>
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

            <Grid item xs={2.5}>
              <AutocompleteDriver />
            </Grid>

            <Grid item xs={1.9}>
              <AutocompleteFleetGroup />
            </Grid>

            <Grid item xs={1.9}>
              <AutocompleteLocationGroup />
            </Grid>

            <Grid item xs={1.5}>
              <AutocompletePosition />
            </Grid>

            <Grid item xs={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "50px" }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
