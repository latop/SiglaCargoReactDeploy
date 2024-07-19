import React from "react";
import { Controller, Form } from "react-hook-form";
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
      <Form {...methods}>
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
                <Controller
                  control={control}
                  name="motoristaLiberado"
                  render={({ field }) => (
                    <AutocompleteDriver label="Motorista liberado" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={1.7}>
                <Controller
                  name="motoristaPlan"
                  control={control}
                  render={({ field }) => {
                    return (
                      <AutocompleteDriver
                        label={"Motorista Planejado"}
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={1.7}>
                <Controller
                  control={control}
                  name="veiculoLiberado"
                  render={({ field }) => {
                    console.log(field.value);
                    return (
                      <AutocompleteTruck label="Veículo Liberado" {...field} />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={1.7}>
                <Controller
                  control={control}
                  name="veiculoPlan"
                  render={({ field }) => (
                    <AutocompleteTruck label="Veículo Planejado" {...field} />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box gap="10px" display="flex" flexDirection="column"></Box>
        </Box>
      </Form>
    </LocalizationProvider>
  );
};
