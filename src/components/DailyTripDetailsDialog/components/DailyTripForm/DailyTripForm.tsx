import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  colors,
  TextField,
  Chip,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@/components/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { DailyTripSectionForm } from "../DailyTripSectionForm";
import { DailyTrip } from "@/interfaces/daily-trip";

dayjs.extend(customParseFormat);

export const DailyTripForm = () => {
  const { control, watch } = useFormContext();
  const dailyTripSections = watch("dailyTripSections");

  const countSections = dailyTripSections?.length;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px" mt="5px">
        <Box display="flex" gap="20px">
          <Grid container spacing={1}>
            <Grid item xs={1.7}>
              <Controller
                name={`sto`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="STO" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={0.8}>
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
                    <MenuItem value="C">Cancelado</MenuItem>
                    <MenuItem value="N">Ativo</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={1.4}>
              <AutocompleteFleetGroup name="fleetGroup.code" />
            </Grid>
            <Grid item xs={1.5}>
              <AutocompleteLocation name="locationOrig.code" />
            </Grid>
            <Grid item xs={1.5}>
              <AutocompleteLocation name="locationDest.code" />
            </Grid>
            <Grid item xs={1.7}>
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
            <Grid item xs={1.7}>
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
            <Grid item xs={1.7}>
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
        <Box gap="10px" display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="subtitle2">Seções da viagem</Typography>
            {countSections > 0 && (
              <Chip label={countSections} color="default" size="small" />
            )}
          </Box>
          {dailyTripSections?.length === 0 && (
            <Box display="flex">
              <Typography variant="body2" color={colors.grey[700]}>
                Não há seções para essa viagem.
              </Typography>
            </Box>
          )}

          <Box gap="16px" display="flex" flexDirection="column">
            {dailyTripSections?.map((_: DailyTrip, index: number) => (
              <DailyTripSectionForm key={index} seq={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
