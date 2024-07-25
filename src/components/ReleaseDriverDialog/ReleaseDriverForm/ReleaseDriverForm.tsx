import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, TextField, Grid } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";

dayjs.extend(customParseFormat);

export const ReleaseDriverForm = () => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px">
        <Grid
          container
          spacing={1}
          width={"100%"}
          rowSpacing={2}
          flexWrap={"nowrap"}
        >
          <Grid item xs={2}>
            <Controller
              name="saida"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="SAIDA"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="entrega"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="ENTREGA"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="demanda"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="DEMANDA"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="destino"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="DESTINO"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <AutocompleteDriver
              label={"Motorista Planejado"}
              name="motoristaPlan"
              onChange={(value) => {
                methods.setValue("motoristaPlan", value?.nickName);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <AutocompleteTruck
              label="Veículo Planejado"
              name="veiculoPlan"
              onChange={(value) => {
                console.log(value?.licensePlate);
                methods.setValue("veiculoPlan", value?.licensePlate);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <AutocompleteDriver
              label="Motorista liberado"
              name="motoristaLiberado"
              onChange={(value) => {
                methods.setValue("motoristaLiberado", value?.nickName);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <AutocompleteTruck
              label="Veículo Liberado"
              name="veiculoLiberado"
              onChange={(value) => {
                methods.setValue("veiculoLiberado", value?.licensePlate);
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box gap="10px" display="flex" flexDirection="column"></Box>
    </LocalizationProvider>
  );
};
