"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, FormProvider } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";
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
                    name="locationTypeCode"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} label="Código da Localidade" />
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
                  <Controller
                    name="integrationCode2" //tms
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} label="Código TMS" />
                    )}
                  />
                </Grid>
                <Grid xs={1.5} item>
                  <AutocompleteLocationType
                    onChange={(value) => {
                      methods.setValue("locationTypeCode", value?.code || "");
                      methods.setValue("locationTypeId", value?.id || "");
                    }}
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
