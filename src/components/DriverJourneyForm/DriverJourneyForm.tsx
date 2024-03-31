import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid, Box, IconButton, colors, Icon } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@/components/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import DeleteIcon from "@mui/icons-material/Delete";
dayjs.extend(customParseFormat);

interface DriverJourneyFormProps {
  onDelete: () => void;
  seq: number;
}

export const DriverJourneyForm = ({
  onDelete,
  seq,
}: DriverJourneyFormProps) => {
  const { control, getValues } = useFormContext();

  const isTravel = getValues(`tasksDriver.${seq}.type`) === "V";
  const isActivity = getValues(`tasksDriver.${seq}.type`) === "A";

  const renderTravelFields = () => (
    <Grid container spacing={1.5}>
      <Grid item xs={3}>
        <Controller
          name={`tasksDriver.${seq}.demand`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Demanda" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name={`tasksDriver.${seq}.lineCode`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Cód. Rota" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name={`tasksDriver.${seq}.locOrig`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Origem" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name={`tasksDriver.${seq}.locDest`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Destino" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name={`tasksDriver.${seq}.startPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
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
          name={`tasksDriver.${seq}.endPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim planejado"
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
          name={`tasksDriver.${seq}.startActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início realizado"
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
          name={`tasksDriver.${seq}.endActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim realizado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
    </Grid>
  );

  const renderActivityFields = () => (
    <Grid container spacing={1.5}>
      <Grid item xs={2}>
        <Controller
          name={`tasksDriver.${seq}.activityCode`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Atividade" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={2.5}>
        <Controller
          name={`tasksDriver.${seq}.startPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início planejado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={2.5}>
        <Controller
          name={`tasksDriver.${seq}.endPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim planejado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={2.5}>
        <Controller
          name={`tasksDriver.${seq}.startActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início realizado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={2.5}>
        <Controller
          name={`tasksDriver.${seq}.endActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim realizado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
    </Grid>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        display={"flex"}
        flexDirection="column"
        gap="16px"
        padding="16px"
        bgcolor={colors.grey[100]}
        borderRadius="4px"
      >
        <Box display="flex" gap="10px" alignItems="center">
          {isTravel && renderTravelFields()}
          {isActivity && renderActivityFields()}
          <IconButton size="medium" onClick={onDelete} sx={{ padding: 0 }}>
            <Icon component={DeleteIcon} fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
