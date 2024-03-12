import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  colors,
  Icon,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { DateTimePicker } from "@/components/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { DriverJourneyForm, IDriverJourneyForm } from "../DriverJourneyForm";
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

  const handleAddJourney = () => {
    const driverSchedules = watch("driverSchedules");
    driverSchedules.push({
      type: "",
      task: "",
      locCodeOrig: "",
      locCodeDest: "",
      lineCode: "",
      licensePlate: "",
      startPlanned: "",
      endPlanned: "",
      startActual: "",
      endActual: "",
      new: true,
    });
    setValue("driverSchedules", driverSchedules);
  };

  const handleDeleteDriverSchedule = (index: number) => {
    const driverSchedules = watch("driverSchedules");
    driverSchedules.splice(index, 1);
    setValue("driverSchedules", driverSchedules);
    addToast("Jornada removida com sucesso");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection="column" gap="20px">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField disabled {...field} label="Status" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="publishedDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled
                    label="Publicado em"
                    fullWidth
                    value={
                      field.value
                        ? dayjs(field.value).format("DD/MM/YYYY HH:mm")
                        : ""
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                name="awareDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled
                    label="Avisado em"
                    fullWidth
                    value={
                      field.value
                        ? dayjs(field.value).format("DD/MM/YYYY HH:mm")
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="otmId"
                control={control}
                render={({ field }) => (
                  <TextField
                    disabled
                    {...field}
                    label="Otm"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
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
          <Box gap="20px" mt="30px" display="flex" flexDirection="column">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Jornadas do motorista</Typography>
              <Button
                variant="contained"
                onClick={handleAddJourney}
                color="secondary"
                size="small"
              >
                <Icon component={AddIcon} fontSize="small" />
                <Typography
                  variant="body2"
                  ml="5px"
                  color={colors.common.white}
                >
                  Adicionar jornada
                </Typography>
              </Button>
            </Box>
            {watch("driverSchedules")?.length === 0 && (
              <Box display="flex">
                <Typography variant="body1" color={colors.grey[700]}>
                  Não há jornadas para este motorista, adicione uma nova
                  jornada.
                </Typography>
              </Box>
            )}

            <Box gap="30px" display="flex" flexDirection="column">
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
