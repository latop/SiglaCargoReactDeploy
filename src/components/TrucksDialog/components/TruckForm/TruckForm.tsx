import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { Controller, useFormContext } from "react-hook-form";
import { AutocompleteStates } from "@/components/AutocompleteStates";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";
import { TruckFormType } from "../../useTrucksDialog";
import { DatePicker } from "@mui/x-date-pickers";

dayjs.extend(customParseFormat);

export const TruckForm = () => {
  const methods = useFormContext<TruckFormType>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap="16px" mt="5px">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <AutocompleteTruck name="licensePlate" />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              control={methods.control}
              name={"fleetCode"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Cod. da Frota"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              control={methods.control}
              name={"manufactureYear"}
              render={({ field }) => {
                return (
                  <DatePicker
                    views={["year"]}
                    label="Ano Fabricação"
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1.6}>
            <AutocompleteStates label="Estado Emplacamento" />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              control={methods.control}
              name={"startDate"}
              render={({ field }) => {
                return <DatePicker label="Data Inicio" {...field} />;
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              control={methods.control}
              name={"endDate"}
              render={({ field }) => {
                return <DatePicker label="Data Fim" {...field} />;
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <AutocompleteFleetGroup name="fleetType" />
          </Grid>
          <Grid item xs={1.5}>
            <AutocompleteLocationGroup />
          </Grid>
          <Grid item xs={3.1}>
            <Controller
              control={methods.control}
              name={"chassisNumber"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Chassi"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              control={methods.control}
              name={"regulatoryNumber"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Renavam"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              control={methods.control}
              name={"serialNumber"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Número de Série"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Controller
              control={methods.control}
              name={"integrationCodeGPS"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Cód Integração GPS"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              control={methods.control}
              name={"tare"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Tara"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Controller
              control={methods.control}
              name={"capacity"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Capacidade"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2.1}>
            <Controller
              control={methods.control}
              name={"regulatoryValidity"}
              render={({ field }) => {
                return <DatePicker label="Dt. Vencimento Revisão" {...field} />;
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Controller
              name={"isRefurbished"}
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  componentsProps={{
                    typography: {
                      variant: "body2",
                    },
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    margin: "0",
                    alignItems: "flex-start",
                  }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        padding: "0",
                      }}
                      {...field}
                      checked={field.value}
                    />
                  }
                  label={"Recondicionado"}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={8.1}>
            <Controller
              control={methods.control}
              name={"note"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Observações"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};
