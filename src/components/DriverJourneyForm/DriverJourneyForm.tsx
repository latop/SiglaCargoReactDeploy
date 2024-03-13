import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  Box,
  MenuItem,
  IconButton,
  colors,
  Icon,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@/components/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import DeleteIcon from "@mui/icons-material/Delete";
dayjs.extend(customParseFormat);

export interface IDriverJourneyForm {
  type: string;
  task: string;
  locCodeOrig: string | null;
  locCodeDest: string | null;
  lineCode: string | null;
  licensePlate: string | null;
  startPlanned: string;
  endPlanned: string;
  startActual: string | null;
  endActual: string | null;
  new: boolean;
}

interface DriverJourneyFormProps {
  onDelete: () => void;
  defaultValues?: IDriverJourneyForm;
}

export const DriverJourneyForm = ({
  defaultValues,
  onDelete,
}: DriverJourneyFormProps) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: defaultValues || {},
  });

  const onSubmit = () => {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display={"flex"}
          flexDirection="column"
          gap="16px"
          padding="16px"
          bgcolor={colors.grey[100]}
          borderRadius="4px"
        >
          <Box display="flex" gap="10px" alignItems="center">
            <Grid container spacing={2}>
              <Grid item xs={1.5}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Tipo" fullWidth>
                      <MenuItem value="A">Atividade</MenuItem>
                      <MenuItem value="V">Viagem</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={1.5}>
                <Controller
                  name="licensePlate"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Placa" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="locCodeOrig"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Origem" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="locCodeDest"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Destino"
                      fullWidth
                      disabled={watch("type") === "A"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="lineCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cód. frota"
                      fullWidth
                      disabled={!defaultValues?.new}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="task"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Atividade"
                      fullWidth
                      disabled={watch("type") !== "A"}
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
                      label="Início planejado"
                      error={error?.message}
                      {...field}
                      disabled={!defaultValues?.new}
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
                      label="Fim planejado"
                      error={error?.message}
                      {...field}
                      disabled={!defaultValues?.new}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date?.format())}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="startActual"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      label="Início realizado"
                      error={error?.message}
                      {...field}
                      disabled={!defaultValues?.new}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date?.format())}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="endActual"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      label="Fim realizado"
                      error={error?.message}
                      {...field}
                      disabled={!defaultValues?.new}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date?.format())}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <IconButton size="medium" onClick={onDelete}>
              <Icon component={DeleteIcon} fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
};
