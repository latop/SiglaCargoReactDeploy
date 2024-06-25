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
  IconButton,
} from "@mui/material";
import { DateTimePicker } from "@/components/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import { IoIosSearch } from "react-icons/io";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { DailyTripSectionForm } from "../DailyTripSectionForm";
import { DailyTrip } from "@/interfaces/daily-trip";
import { AutocompleteLine } from "@/components/AutocompleteLine";
import { AutocompleteCompany } from "@/components/AutocompleteCompany";
import { AutocompleteTripType } from "@/components/AutocompleteTripType";
import { fetchDailyTripDetails } from "@/services/schedule";

dayjs.extend(customParseFormat);

export const DailyTripForm = () => {
  const { control, watch, getValues, setValue, reset } = useFormContext();
  const dailyTripSections = watch("dailyTripSections");

  const countSections = dailyTripSections?.length;

  const handleSearchInfos = async () => {
    if (watch("lineId") && watch("startPlanned")) {
      const line = watch("lineId");
      const startPlanned = watch("startPlanned");
      reset({ dailyTripSections: [] });
      const data = await fetchDailyTripDetails({
        args: {
          lineId: line,
          startTime: startPlanned,
        },
      });
      reset({
        ...getValues(),
        ...data.dailyTrip,
        dailyTripSections: data.dailyTripSections,
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px" mt="5px">
        <Box display="flex" gap="20px">
          <Grid container spacing={1}>
            <Grid item xs={1.7}>
              <AutocompleteLine
                onChange={(value) => {
                  setValue("lineId", value?.id);
                  setValue("line", value);
                }}
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
            <Grid item xs={1.5} marginLeft="10px">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleSearchInfos}
              >
                <IoIosSearch />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" gap="20px">
          <Grid container spacing={1}>
            <Grid item xs={1.7}>
              <Controller
                name="tripDate"
                control={control}
                render={({ field }) => (
                  <DateField
                    disabled={false}
                    label="Data da viagem"
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.7}>
              <Controller
                name="sto"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="STO"
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.7}>
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

            <Grid item xs={1.7}>
              <AutocompleteCompany />
            </Grid>
            <Grid item xs={1.7}>
              <AutocompleteTripType name="tripType.code" />
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" gap="20px">
          <Grid container spacing={1}>
            <Grid item xs={1.7}>
              <AutocompleteLocation name="locationOrig.code" label="Origem" />
            </Grid>
            <Grid item xs={1.7}>
              <AutocompleteLocation name="locationDest.code" label="Destino" />
            </Grid>
            <Grid item xs={1.7}>
              <AutocompleteFleetGroup name="fleetGroup.code" />
            </Grid>
            <Grid item xs={1.7}>
              <Controller
                name="startActual"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DateTimePicker
                    disabled={false}
                    label="Início executado"
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
                name="endActual"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DateTimePicker
                    disabled={false}
                    label="Fim executado"
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
