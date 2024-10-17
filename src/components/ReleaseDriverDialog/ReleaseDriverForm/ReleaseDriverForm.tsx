import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const BoxField = (children: unknown): React.ReactElement => (
  <BoxField sx={{ flexBasis: "135px" }}>{children}</BoxField>
);

export const ReleaseDriverForm = () => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px">
        <Box display="flex" flexDirection="row" gap="10px" flexWrap={"wrap"}>
          <BoxField>
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
          </BoxField>
          <BoxField>
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
          </BoxField>
          <BoxField>
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
          </BoxField>
          <BoxField>
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
          </BoxField>
          <BoxField>
            <AutocompleteDriver
              label={"Motorista Planejado"}
              disabled
              name="motoristaPlan"
              onChange={(value) => {
                methods.setValue("motoristaPlan", value?.nickName);
              }}
            />
          </BoxField>
          <BoxField>
            <AutocompleteTruck
              label="Veículo Planejado"
              name="veiculoPlan"
              disabled
              onChange={(value) => {
                console.log(value?.licensePlate);
                methods.setValue("veiculoPlan", value?.licensePlate);
              }}
            />
          </BoxField>
          <BoxField>
            <AutocompleteDriver
              label="Motorista liberado"
              name="motoristaLiberado"
              onChange={(value) => {
                methods.setValue("motoristaLiberado", value?.nickName);
              }}
            />
          </BoxField>
          <BoxField>
            <AutocompleteTruck
              label="Veículo Liberado"
              name="veiculoLiberado"
              onChange={(value) => {
                methods.setValue("veiculoLiberado", value?.licensePlate);
              }}
            />
          </BoxField>
          {/* <Grid item xs={2}>
            <Controller
              name="mdfe"
              control={control}
              render={({ field }) => {
                return (
                  <BaseNumberInput
                    aria-label="MDFE"
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="cte"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="CTE"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="obs"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="OBS"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Grid> */}
        </Box>
      </Box>
      <Box gap="10px" display="flex" flexDirection="column"></Box>
    </LocalizationProvider>
  );
};
