"use client";

import React from "react";
import dayjs from "dayjs";
import { Controller, FormProvider } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@/components/DatePicker";
import { useVehiclePlanningsFilterBar } from "./useVehiclePlanningsFilterBar";
import SearchIcon from "@mui/icons-material/Search";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AutocompleteFleetGroup } from "../AutocompleteFleetGroup";
import { AutocompleteDriver } from "../AutocompleteDriver";
import { AutocompleteTruck } from "../AutocompleteTruck";
import "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

export function VehiclePlanningsFilterBar(
  props: React.HTMLProps<HTMLFormElement>,
) {
  const { methods, onSubmit } = useVehiclePlanningsFilterBar();
  const { control, handleSubmit } = methods;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Grid
            container
            alignItems="center"
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
                    label="Data da viagem"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={2} paddingLeft="0">
              <AutocompleteFleetGroup />
            </Grid>
            <Grid item xs={2} paddingLeft="0">
              <AutocompleteDriver />
            </Grid>
            <Grid item xs={1.6} paddingLeft="0">
              <AutocompleteTruck
                name="licensePlate"
                onChange={(value) => {
                  if (value?.licensePlate) {
                    methods.setValue("licensePlate", value?.licensePlate);
                  } else {
                    methods.setValue("licensePlate", "");
                  }
                }}
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
