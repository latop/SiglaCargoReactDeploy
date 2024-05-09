import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, TextField, Grid, MenuItem } from "@mui/material";
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

export const DailyTripForm = () => {
  // const { addToast } = useToast();
  const { control } = useFormContext();
  // const tasksDriver = watch("tasksDriver");

  // const handleDeleteDriverSchedule = (index: number) => {
  //   tasksDriver.splice(index, 1);
  //   setValue("tasksDriver", tasksDriver);
  //   addToast("Viagem removida com sucesso");
  // };

  // const countJourneys = tasksDriver?.length;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px" mt="5px">
        <Box display="flex" gap="20px">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Controller
                name={`sto`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="STO" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="flgStatus"
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
            <Grid item xs={3}>
              <AutocompleteFleetGroup name="fleetGroup.code" />
            </Grid>
            <Grid item xs={3}>
              <AutocompleteLocation name="locationOrig.code" />
            </Grid>
            <Grid item xs={3}>
              <AutocompleteLocation name="locationDest.code" />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="tripDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DateTimePicker
                    disabled={false}
                    label="Data da viagem"
                    error={error?.message}
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="startPlanned"
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
            <Grid item xs={3}>
              <Controller
                name="endPlanned"
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
          </Grid>
        </Box>
        {/* <Box gap="10px" display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="subtitle2">Jornadas do motorista</Typography>
            {countJourneys > 0 && (
              <Chip label={countJourneys} color="default" size="small" />
            )}
          </Box>
          {tasksDriver?.length === 0 && (
            <Box display="flex">
              <Typography variant="body2" color={colors.grey[700]}>
                Não há jornadas para este motorista, adicione uma nova jornada.
              </Typography>
            </Box>
          )}

          <Box gap="16px" display="flex" flexDirection="column">
            {tasksDriver?.map((taskDriver: TaskDriver, index: number) => (
              <DriverJourneyForm
                onDelete={() => handleDeleteDriverSchedule(index)}
                key={index}
                seq={index}
              />
            ))}
          </Box>
        </Box> */}
      </Box>
    </LocalizationProvider>
  );
};
