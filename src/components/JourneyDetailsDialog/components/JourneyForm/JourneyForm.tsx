import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Grid, Box, Typography, colors, Chip } from "@mui/material";

import styled from "@emotion/styled";
import { DateTimePicker } from "@/components/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import {
  DriverJourneyForm,
  IDriverJourneyForm,
} from "../../../DriverJourneyForm";
import { useToast } from "@/hooks/useToast";

dayjs.extend(customParseFormat);

const TextArea = styled(TextField)`
  && {
    height: 100%;

    .MuiInputBase-root,
    textarea {
      height: 100% !important;
    }
  }
`;

export interface IJourneyForm {
  status: string;
  publishedDate: string;
  awareDate: string;
  otmId: string;
  presentationDate: string;
  presentationDateActual: string;
  cutoffDate: string;
  cutoffDateActual: string;
  notes: string;
  driverSchedules: IDriverJourneyForm[];
}

export const JourneyForm = () => {
  const { addToast } = useToast();
  const { control, handleSubmit, watch, setValue } = useFormContext();

  const onSubmit = () => {};

  const handleDeleteDriverSchedule = (index: number) => {
    const driverSchedules = watch("driverSchedules");
    driverSchedules.splice(index, 1);
    setValue("driverSchedules", driverSchedules);
    addToast("Jornada removida com sucesso");
  };

  const countJourneys = watch("driverSchedules")?.length;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection="column" gap="20px">
          <Box display="flex" gap="20px">
            <Grid container spacing={2} xs={3.03} columns={6}>
              <Grid item xs={3}>
                <Controller
                  name="presentationDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      disabled={false}
                      label="Apresentação prevista"
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
                  name="presentationDateActual"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      disabled={false}
                      label="Apresentação realizada"
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
                  name="cutoffDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      disabled={false}
                      label="Finalização prevista"
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
                  name="cutoffDateActual"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      disabled={false}
                      label="Finalização realizada"
                      error={error?.message}
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date?.format())}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} xs={6.1}>
              <Grid item xs={12}>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      disabled={false}
                      label="Observações"
                      variant="outlined"
                      fullWidth
                      multiline
                      maxRows={3}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box gap="10px" mt="5px" display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" gap="8px">
              <Typography variant="subtitle1">Jornadas do motorista</Typography>
              {countJourneys > 0 && (
                <Chip label={countJourneys} color="default" size="small" />
              )}
            </Box>
            {watch("driverSchedules")?.length === 0 && (
              <Box display="flex">
                <Typography variant="body2" color={colors.grey[700]}>
                  Não há jornadas para este motorista, adicione uma nova
                  jornada.
                </Typography>
              </Box>
            )}

            <Box gap="16px" display="flex" flexDirection="column">
              {watch("driverSchedules")?.map(
                (driverSchedule: IDriverJourneyForm, index: number) => (
                  <DriverJourneyForm
                    onDelete={() => handleDeleteDriverSchedule(index)}
                    key={index}
                    defaultValues={driverSchedule}
                  />
                ),
              )}
            </Box>
          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
};
