"use client";

import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { AutocompleteTripType } from "@/components/AutocompleteTripType";
import { DatePicker } from "@/components/DatePicker";
import { FetchDailyTripsParams } from "@/services/daily-trips";
import { formatPlate } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

dayjs.extend(customParseFormat);

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  {
    message: "Data é obrigatório",
  },
);

const schema = z.object({
  fleetGroupCode: z.string().optional(),
  fleetGroupId: z.string().optional(),
  locationOrigId: z.string().optional(),
  locationDestId: z.string().optional(),
  tripDate: dateOrDayjsSchema,
  sto: z.string().optional(),
  flgStatus: z.string().optional(),
  licensePlate: z.string().optional(),
});

interface FormFields extends FetchDailyTripsParams {}

interface Params {
  onChange: (value: FormFields) => void;
}

export function DailyTripsFilterBar({ onChange }: Params) {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fleetGroupId: "",
      locationDestId: "",
      locationOrigId: "",
      startDate: "",
      sto: "",
      flgStatus: "",
      licensePlate: "",
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: FormFields) => {
    onChange(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="center"
            width="100%"
            gap="16px"
          >
            <Grid item xs={1.6}>
              <Controller
                name="tripDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data da viagem *"
                    error={error?.message}
                    {...field}
                    value={dayjs(field.value)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={2} paddingLeft="0">
              {/* <AutocompleteFleetGroup /> */}
              <Controller
                name="licensePlate"
                control={control}
                rules={{
                  validate: (value) => {
                    if (
                      !RegExp(/[A-z]{3}-*\d[A-j0-9]\d{2}/).exec(value as string)
                    ) {
                      return "Placa inválida";
                    }
                  },
                }}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      error={fieldState.error ? true : false}
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                          opacity: 1,
                        },
                      }}
                      label="Placa da Carreta"
                      {...field}
                      value={field.value}
                      inputProps={{ maxLength: 50 }}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = formatPlate(e.target.value);
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={1.7} paddingLeft="0">
              <AutocompleteTripType
                name="tripTypeCode"
                label="Tipo da viagem"
                keyCode="id"
              />
            </Grid>
            <Grid item xs={1.6} paddingLeft="0">
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
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            </Grid>

            <Grid item xs={1.6} paddingLeft="0">
              <AutocompleteLocation
                name="locationDestId"
                label="Destino"
                keyCode="id"
              />
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
                    <MenuItem value="C">Cancelado</MenuItem>
                    <MenuItem value="N">Ativo</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={1}>
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
}
