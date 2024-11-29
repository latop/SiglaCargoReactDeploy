import React from "react";
// import { useFormContext } from "react-hook-form";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { DriverTabs } from "../DriverTabs/DriverTabs";
import { Controller, useFormContext } from "react-hook-form";
import { Driver } from "@/interfaces/driver";
import { DatePicker } from "@/components/DatePicker";

dayjs.extend(customParseFormat);

export const DriverForm = () => {
  const methods = useFormContext<Driver>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="12px" mt="5px">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"name"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Nome"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"lastName"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Sobre nome"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"nickName"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Apelido"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"registration"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Matrícula"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"seniority"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Serionidade"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"identification"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Identificação"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name="genre"
              render={({ field }) => (
                <FormControl>
                  <FormLabel
                    sx={{
                      height: "10px",
                      fontSize: "12px",
                    }}
                  >
                    Sexo
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      "& .MuiTypography-root ": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="F"
                      control={<Radio size="small" />}
                      label="F"
                    />
                    <FormControlLabel
                      value="M"
                      control={<Radio size="small" />}
                      label="M"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"birthdate"}
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    label="Data de nasc."
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"admission"}
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    label="Admissão"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"resign"}
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    label="Demissão"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format())}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={methods.control}
              name={"address"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Endereço"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"zipCode"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="CEP"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"cityId"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Cidade"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"stateId"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Estado"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"countryId"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="País"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"email"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"phone1"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"phone2"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Celular"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"isActive"}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Ativo"
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
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
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"integrationCode"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Código de Integração"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={methods.control}
              name={"integrationCodeGPS"}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Código de Integração GPS"
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <Box
          gap="10px"
          display="flex"
          flexDirection="column"
          maxHeight={"300px"}
        >
          <DriverTabs />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
