import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@/components/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";
import { TimePicker } from "@mui/x-date-pickers";

dayjs.extend(customParseFormat);

const daysOfWeek = [
  { field: "freqMon", headerName: "Segunda" },
  { field: "freqTue", headerName: "Terça" },
  { field: "freqWed", headerName: "Quarta" },
  { field: "freqThu", headerName: "Quinta" },
  { field: "freqFri", headerName: "Sexta" },
  { field: "freqSat", headerName: "Sábado" },
  { field: "freqSun", headerName: "Domingo" },
];

export const VehiclePlanningForm = () => {
  const { control, setValue, watch } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px" mt="5px">
        <Box display="flex" gap="20px">
          <Grid container spacing={1}>
            <Grid item xs={1.4}>
              <AutocompleteTruck
                onChange={(value) => {
                  setValue("truck", value);
                  setValue("truckId", value?.id);
                }}
              />
            </Grid>
            <Grid item xs={1.4}>
              <Controller
                name="truck.locationGroup.code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Base do veículo"
                    InputLabelProps={{ shrink: true }}
                    value={watch("truck.locationGroup.code")}
                    disabled
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.4}>
              <Controller
                name="truck.fleetType.code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    value={watch("truck.fleetType.fleetGroup.code")}
                    InputLabelProps={{ shrink: true }}
                    label="Grupo de frota"
                    disabled
                  />
                )}
              />
            </Grid>

            <Grid item xs={1.7}>
              <AutocompleteDriver
                name="driver.nickName"
                onChange={(value) => {
                  setValue("driver", value);
                }}
              />
            </Grid>
            <Grid item xs={1.7}>
              <Controller
                name="startDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    disabled={false}
                    label="Data de início"
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
                name="endDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    disabled={false}
                    label="Data de fim"
                    error={error?.message}
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.3}>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    disabled={false}
                    label="Hora de início"
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.3}>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    disabled={false}
                    label="Hora de fim"
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1">
              Selecione os dias abaixo
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {daysOfWeek.map((day) => (
              <Grid display="flex" justifyContent="center" item key={day.field}>
                <Controller
                  name={day.field}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      componentsProps={{
                        typography: {
                          variant: "body2",
                        },
                      }}
                      control={
                        <Checkbox
                          size="small"
                          {...field}
                          checked={field.value}
                        />
                      }
                      label={day.headerName}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
