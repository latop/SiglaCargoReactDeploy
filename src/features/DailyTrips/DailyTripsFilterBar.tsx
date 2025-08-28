"use client";

import { AutocompleteCompany } from "@/components/AutocompleteCompany";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { AutocompleteTripType } from "@/components/AutocompleteTripType";
import { DatePicker } from "@/components/DatePicker";
import {
  CollapseButton,
  FiltersCollapsable,
  useFiltersCollapse,
} from "@/components/FiltersCollapsable";
import { formatPlate } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
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
const schema = z
  .object({
    fleetGroupId: z.string().optional(), // Filter1Id
    locationOrigId: z.string().optional(), // Filter2Id
    locationDestId: z.string().optional(), // Filter3Id
    tripTypeId: z.string().optional(), // Filter4Id
    companyId: z.string().optional(), // Filter5Id
    lineId: z.string().optional(), // Filter6Id
    sto: z.string().optional(), // Filter1String
    tripDate: dateOrDayjsSchema.optional(), // Filter2String
    flgStatus: z.string().optional(), // Filter3String
    licensePlate: z.string().optional(), // Filter4String
    nickName: z.string().optional(), // Filter5String
  })
  .refine(
    (data) => {
      const hasTripDate = data.tripDate && dayjs.isDayjs(data.tripDate);
      const hasSto = data.sto && data.sto.trim() !== "";

      return hasTripDate || hasSto;
    },
    {
      message: "Informe a Data da Viagem ou o STO",
      path: ["tripDate"],
    },
  )
  .refine(
    (data) => {
      const hasTripDate = data.tripDate && dayjs.isDayjs(data.tripDate);
      const hasSto = data.sto && data.sto.trim() !== "";

      return hasTripDate || hasSto;
    },
    {
      message: "Informe a Data da Viagem ou o STO",
      path: ["sto"],
    },
  );

// eslint-disable-next-line prettier/prettier
interface FormFields {
  fleetGroupId?: string; // Filter1Id
  locationOrigId?: string; // Filter2Id
  locationDestId?: string; // Filter3Id
  tripTypeId?: string; // Filter4Id
  companyId?: string; // Filter5Id
  lineId?: string; // Filter6Id
  sto?: string; // Filter1String
  tripDate?: string; // Filter2String
  flgStatus?: string; // Filter3String
  licensePlate?: string; // Filter4String
  nickName?: string; // Filter5String
}

interface Params {
  onChange: (value: FormFields) => void;
}

const initialValues = {
  fleetGroupId: "", // Filter1Id
  locationOrigId: "", // Filter2Id
  locationDestId: "", // Filter3Id
  tripTypeId: "", // Filter4Id
  companyId: "", // Filter5Id
  lineId: "", // Filter6Id
  sto: "", // Filter1String
  tripDate: null, // Filter2String
  flgStatus: "", // Filter3String - Default to 'N' for active
  licensePlate: "", // Filter4String
  nickName: "", // Filter5String
};

export function DailyTripsFilterBar({ onChange }: Params) {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...initialValues,
      tripDate: undefined,
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: FormFields) => {
    onChange(data);
  };
  const { showMoreFilters, toggleMoreFilters } =
    useFiltersCollapse("daily-trips-filter");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignItems="flex-start" width="100%" gap={0.5}>
            <Grid item xs={1.5}>
              <Controller
                name="tripDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data da viagem *"
                    error={error?.message}
                    {...field}
                    value={field.value ? dayjs(field.value) : undefined}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1.5}>
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
            <Grid item xs={1.5}>
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
                    <MenuItem value="N">Ativo</MenuItem>
                    <MenuItem value="C">Cancelado</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={1.5}>
              <AutocompleteDriver />
            </Grid>
            <Grid item xs={1.5}>
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
                      label="Placa do Caminhão"
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

            <Grid item xs={1}>
              <Button
                type="reset"
                size="large"
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => {
                  window.location.reload();
                }}
              >
                Limpar
              </Button>
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
            <Grid item xs={1.5}>
              <CollapseButton
                isOpen={showMoreFilters}
                onClick={toggleMoreFilters}
              />
            </Grid>
          </Grid>
          <Box pt={1}>
            <FiltersCollapsable isOpen={showMoreFilters}>
              <Grid item xs={1.5}>
                <AutocompleteFleetGroup />
              </Grid>
              <Grid item xs={1.5}>
                <AutocompleteLocation
                  name="locationOrigId"
                  label="Origem"
                  keyCode="id"
                />
              </Grid>
              <Grid item xs={1.5}>
                <AutocompleteLocation
                  //       ref={locationOrigRef}
                  name="locationDestId"
                  label="Destino"
                  keyCode="id"
                />
              </Grid>
              <Grid item xs={1.5}>
                <AutocompleteTripType
                  name="tripTypeId"
                  label="Tipo da viagem"
                  keyCode="id"
                />
              </Grid>
              <Grid item xs={1.5}>
                <AutocompleteCompany />
              </Grid>
            </FiltersCollapsable>
          </Box>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
