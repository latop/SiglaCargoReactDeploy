"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, FormProvider } from "react-hook-form";
import { Box, Button, Grid, Switch, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { useLocationsFilterBar } from "./useLocationsFilterBar";
import { AutocompleteLocationType } from "../AutocompleteLocationType";

dayjs.extend(customParseFormat);

export function LocationsFilterBar() {
  const { methods, onClearParams, onSubmit } = useLocationsFilterBar();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <Box display={"flex"}>
          <form style={{ width: "100%", display: "flex" }}>
            <Grid
              container
              justifyContent="space-between"
              gap="16px"
              direction={"row"}
            >
              <Grid container alignItems="flex-start" width="100%" gap="16px">
                <Grid xs={1.5} item>
                  <Controller
                    name="locationCode"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} label="Cód. da Localidade" />
                    )}
                  />
                </Grid>
                <Grid xs={1.5} item>
                  <Controller
                    name="integrationCode2" //tms
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} label="Código TMS" />
                    )}
                  />
                </Grid>
                <Grid xs={1.5} item>
                  <Controller
                    name="integrationCode" //gps
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} label="Código GPS" />
                    )}
                  />
                </Grid>
                <Grid xs={1.5} item>
                  <AutocompleteLocationType
                    name="locationTypeCode"
                    onChange={(value) => {
                      methods.setValue("locationTypeCode", value?.code || "");
                      methods.setValue("locationTypeId", value?.id || "");
                    }}
                  />
                </Grid>
                <Grid item xs={0.9}>
                  <Controller
                    name="isOperation"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label="Operacional"
                        id="showTruckAssignment"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <Switch
                              size="medium"
                              id="showTruckAssignment"
                              {...field}
                              name="showTruckAssignment"
                              checked={field.value}
                              onChange={(value) => {
                                field.onChange(value.currentTarget.checked);
                              }}
                            />
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Box
            display="flex"
            justifyContent={"space-between"}
            maxWidth={"170px"}
            width={"100%"}
          >
            <Button color="primary" onClick={onClearParams} variant="outlined">
              Limpar
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              <GridSearchIcon />
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </LocalizationProvider>
  );
}
