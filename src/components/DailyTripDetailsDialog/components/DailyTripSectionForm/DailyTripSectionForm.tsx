import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Grid,
  colors,
  IconButton,
  Icon,
  Tooltip,
} from "@mui/material";
import { DateTimePicker } from "@/components/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";

dayjs.extend(customParseFormat);

export const DailyTripSectionForm = ({ seq }: { seq: number }) => {
  const { control, setValue, getValues } = useFormContext();

  const handleDeleteStep = () => {
    const steps = getValues("dailyTripSections");
    steps.splice(seq, 1);
    setValue("dailyTripSections", steps);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        display={"flex"}
        padding="10px"
        bgcolor={colors.grey[100]}
        borderRadius="4px"
      >
        <Grid container spacing={1}>
          <Grid item xs={1.2}>
            <Controller
              name={`dailyTripSections.${seq}.truck.licensePlate`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Placa"
                  error={!!error?.message}
                  helperText={error?.message?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={1.5}>
            <AutocompleteDriver />
          </Grid>
          <Grid item xs={1.2}>
            <AutocompleteLocation
              name={`dailyTripSections.${seq}.locationOrig.code`}
              label="Origem"
            />
          </Grid>
          <Grid item xs={1.2}>
            <AutocompleteLocation
              name={`dailyTripSections.${seq}.locationDest.code`}
              label="Destino"
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
        <Tooltip title="Remover viagem" arrow>
          <IconButton size="small" onClick={handleDeleteStep}>
            <Icon component={DeleteIcon} fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </LocalizationProvider>
  );
};
