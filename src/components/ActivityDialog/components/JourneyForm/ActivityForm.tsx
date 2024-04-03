import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, Grid } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@/components/DatePicker";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteActivity } from "@/components/AutocompleteActivity";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

export const ActivityForm = () => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box gap="16px" display="flex" flexDirection="column">
        <Grid container spacing={1} xs={12}>
          <Grid item xs={2.4}>
            <AutocompleteActivity />
          </Grid>
          <Grid item xs={2.4}>
            <AutocompleteDriver />
          </Grid>
          <Grid item xs={2.4}>
            <Controller
              name={`journeyDate`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  label="Data da jornada"
                  error={error?.message}
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format())}
                />
              )}
            />
          </Grid>
          <Grid item xs={2.4}>
            <Controller
              name={`startActivity`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  label="Início da atividade"
                  error={error?.message}
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format())}
                />
              )}
            />
          </Grid>
          <Grid item xs={2.4}>
            <Controller
              name={`endActivity`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  label="Fim da atividade"
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
