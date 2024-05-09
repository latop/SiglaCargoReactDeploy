import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, TextField, Grid, MenuItem, colors } from "@mui/material";
import { DateTimePicker } from "@/components/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import { DriverJourneyForm } from "../../../DriverJourneyForm";
// import { useToast } from "@/hooks/useToast";
// import { TaskDriver } from "@/interfaces/schedule";
import "dayjs/locale/pt-br";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";

dayjs.extend(customParseFormat);

export const DailyTripSectionForm = ({ seq }: { seq: number }) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        display={"flex"}
        flexDirection="column"
        padding="10px"
        bgcolor={colors.grey[100]}
        borderRadius="4px"
      >
        <Grid container spacing={1}>
          <Grid item xs={0.8}>
            <Controller
              name={`dailyTripSections.${seq}.flgStatus`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Status"
                  select
                  error={!!error?.message}
                  helperText={error?.message?.toString()}
                >
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="N">N</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={1.4}>
            <AutocompleteFleetGroup
              name={`dailyTripSections.${seq}.fleetGroup.code`}
            />
          </Grid>
          <Grid item xs={1.5}>
            <AutocompleteLocation
              name={`dailyTripSections.${seq}.locationOrig.code`}
            />
          </Grid>
          <Grid item xs={1.5}>
            <AutocompleteLocation
              name={`dailyTripSections.${seq}.locationDest.code`}
            />
          </Grid>
          <Grid item xs={1.7}>
            <Controller
              name={`dailyTripSections.${seq}.startPlanned`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  disabled={false}
                  label="Início planejado"
                  error={error?.message}
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format())}
                />
              )}
            />
          </Grid>
          <Grid item xs={1.7}>
            <Controller
              name={`dailyTripSections.${seq}.endPlanned`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  disabled={false}
                  label="Fim planejado"
                  error={error?.message}
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format())}
                />
              )}
            />
          </Grid>
          <Grid item xs={1.7}>
            <Controller
              name={`dailyTripSections.${seq}.startEstimated`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  disabled={false}
                  label="Início estimado"
                  error={error?.message}
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format())}
                />
              )}
            />
          </Grid>
          <Grid item xs={1.7}>
            <Controller
              name={`dailyTripSections.${seq}.endEstimated`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  disabled={false}
                  label="Fim estimado"
                  error={error?.message}
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format())}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};
