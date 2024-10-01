import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { AutocompleteTripType } from "@/components/AutocompleteTripType";
import { DatePicker } from "@mui/x-date-pickers";

dayjs.extend(customParseFormat);

const daysOfWeek = [
  { field: "freqMon", headerName: "Seg" },
  { field: "freqTue", headerName: "Ter" },
  { field: "freqWed", headerName: "Qua" },
  { field: "freqThu", headerName: "Qui" },
  { field: "freqFri", headerName: "Sex" },
  { field: "freqSat", headerName: "Sáb" },
  { field: "freqSun", headerName: "Dom" },
];

export const AddLineForm = () => {
  const {
    control,
    // watch,
    setValue,
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="12px" mt="5px">
        <Box display="flex" gap="20px">
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Controller
                name="code"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    value={field.value.toUpperCase() || ""}
                    variant="outlined"
                    fullWidth
                    label="Código"
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Descrição"
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" gap="20px">
          <Grid container spacing={1} width={"100%"}>
            <Grid item xs={2}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    disabled={false}
                    sx={{ width: "100%" }}
                    label="Início"
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    disabled={false}
                    label="Fim"
                    sx={{ width: "100%" }}
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                )}
              />
            </Grid>
            {daysOfWeek.map((day) => (
              <Grid
                display="flex"
                justifyContent="center"
                xs={0.295}
                item
                key={day.field}
              >
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
                      sx={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        margin: "0",
                      }}
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            padding: "0",
                          }}
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
            <Grid item xs={2}>
              <Controller
                name="overtimeAllowed"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Hora extra permitida"
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                name="cost"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Custo"
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" gap="20px">
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <AutocompleteLocation
                name="locationOrig"
                label="Origem"
                onChange={(value) => setValue("locationOrig", value)}
              />
            </Grid>
            <Grid item xs={2}>
              <AutocompleteLocation
                name="locationDest"
                label="Destino"
                onChange={(value) => setValue("locationDest", value)}
              />
            </Grid>
            <Grid item xs={2}>
              <AutocompleteFleetGroup name="fleetGroup.code" />
            </Grid>
            <Grid item xs={2}>
              <AutocompleteTripType
                name="tripType.code"
                onChange={(value) => {
                  setValue("tripType", value);
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
