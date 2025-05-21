"use client";

import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, FormProvider } from "react-hook-form";
import { useNewTripOptmizationFilterBar } from "./useNewTripOptmizationFilterBar";
import { AutocompleteLocationGroup } from "../AutocompleteLocationGroup";

import SearchIcon from "@mui/icons-material/Search";

export function NewTripOptmizationFilterBar() {
  const { methods, onSubmit } = useNewTripOptmizationFilterBar();

  const { control, handleSubmit } = methods;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignItems="flex-start" spacing={1}>
            <Grid item xs={1.5}>
              <Controller
                name="start"
                rules={{ required: true }}
                control={control}
                render={({ field }) => <DatePicker label="Início" {...field} />}
              />
            </Grid>
            <Grid item xs={2}>
              <AutocompleteLocationGroup
                name="locationGroupCode"
                label="Cód. Loc"
                onChange={(value) => {
                  methods.setValue("locationGroupCode", value?.code as string);
                }}
              />
            </Grid>
            <Grid item xs={4} display="flex" gap="4px">
              <Button
                size="large"
                variant="contained"
                color="primary"
                type="submit"
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
