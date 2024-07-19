import React from "react";
import { Controller } from "react-hook-form";
import { Box, TextField, Grid } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { useReleaseDriverDialog } from "../useReleaseDriverDialog";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";

dayjs.extend(customParseFormat);

export const ReleaseDriverForm = () => {
  const { methods } = useReleaseDriverDialog();
  const { control, formState } = methods;
  const { defaultValues } = formState;

  console.log(defaultValues);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px" mt="5px">
        <Box display="flex" gap="20px">
          <Grid container spacing={2}>
            <Grid item xs={1.7}>
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
                      value={
                        field.value
                          ? dayjs(field.value).format("DD/MM/YYYY HH:mm")
                          : dayjs()
                      }
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={1.7}>
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
                      value={
                        field.value
                          ? dayjs(field.value).format("DD/MM/YYYY HH:mm")
                          : dayjs()
                      }
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={1.7}>
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
            <Grid item xs={1.7}>
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
          </Grid>
        </Box>

        <Box>
          <Grid spacing={2} container>
            <Grid item xs={1.7}>
              <AutocompleteDriver
                label={"Motorista Planejado"}
                name="motoristaPlan"
              />
            </Grid>
            <Grid item xs={1.7}>
              <AutocompleteTruck
                label="Veículo Planejado"
                name="veiculoPlan"
                onChange={(value) => {
                  methods.setValue("veiculoPlan", value?.licensePlate);
                }}
              />
            </Grid>
            <Grid item xs={1.7}>
              <AutocompleteDriver
                label="Motorista liberado"
                name="motoristaLiberado"
              />
            </Grid>
            <Grid item xs={1.7}>
              <AutocompleteTruck
                label="Veículo Liberado"
                name="veiculoLiberado"
              />
            </Grid>
          </Grid>
        </Box>
        <Box gap="10px" display="flex" flexDirection="column"></Box>
      </Box>
    </LocalizationProvider>
  );
};
