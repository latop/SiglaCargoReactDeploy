import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Grid, Box } from "@mui/material";
import styled from "@emotion/styled";
import { DatePicker } from "@/components/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";

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

interface DriverJourneyFormProps {
  defaultValues?: {
    status: string;
    publishedDate: string;
    awareDate: string;
    otmId: string;
    presentationDate: string;
    presentationDateActual: string;
    cutoffDate: string;
    cutoffDateActual: string;
    notes: string;
  };
}

export const DriverJourneyForm = ({
  defaultValues,
}: DriverJourneyFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues || {},
  });

  const onSubmit = () => {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection="column" gap="20px">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    disabled
                    {...field}
                    label="Status"
                    fullWidth
                    select
                  >
                    <MenuItem value="N">Não avisado</MenuItem>
                    <MenuItem value="S">Avisado</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="publishedDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    disabled
                    label="Publicado em"
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
                name="awareDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    disabled
                    label="Avisado em"
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
                    <DatePicker
                      disabled
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
                    <DatePicker
                      disabled
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
                    <DatePicker
                      disabled
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
                    <DatePicker
                      disabled
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
                      disabled
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
          {/* <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Box> */}
        </Box>
      </form>
    </LocalizationProvider>
  );
};
