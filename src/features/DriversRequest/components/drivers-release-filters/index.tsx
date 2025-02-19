import { AutocompleteActivity } from "@/components/AutocompleteActivity";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import SearchIcon from "@mui/icons-material/Search";
import { DriverReleaseFilterPayload } from "@/services/query/drivers";

interface Params extends React.HTMLProps<HTMLFormElement> {
  onApplySearch: (data: DriverReleaseFilterPayload) => void;
}

const DriverReleaseFilters = ({ onApplySearch, ...props }: Params) => {
  const methods = useForm();
  const { control, handleSubmit, watch } = methods;

  const onSubmit = (values: any) => {
    console.log("values", values);
    onApplySearch(values);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid item xs={1.2}>
              <Controller
                name="startDate"
                rules={{ required: true }}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Início da Jornada"
                    // error={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.2}>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Fim da Jornada"
                    // error?={error?.message}
                    minDate={dayjs(watch("startDate"))}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={1.1}>
              <AutocompleteDriver />
            </Grid>

            <Grid item xs={1.1}>
              <AutocompleteActivity />
            </Grid>

            <Grid item xs={1.1}>
              <AutocompleteFleetGroup />
            </Grid>

            <Grid item xs={1.1}>
              <AutocompleteLocationGroup />
            </Grid>

            <Grid item xs={1.6} paddingLeft="0">
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
                    <MenuItem value="">Pendente de Análise</MenuItem>
                    <MenuItem value="A">Aprovado</MenuItem>
                    <MenuItem value="D">Negado</MenuItem>
                    <MenuItem value="T">Todos</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={0.5}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                fullWidth
              >
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
};

export default DriverReleaseFilters;
