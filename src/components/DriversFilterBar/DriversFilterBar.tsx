"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDriversFilterBar } from "./useDriversFilterBar";
import { Controller, FormProvider } from "react-hook-form";
import { Button, Grid, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AutocompleteDriver } from "../AutocompleteDriver";
import { DatePicker } from "../DatePicker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

export function DriversFilterBar() {
  const { methods, onSubmit } = useDriversFilterBar();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} style={{ width: "100%", display: "flex" }}>
          <Grid
            container
            justifyContent="space-between"
            gap="16px"
            direction={"row"}
          >
            <Grid container direction={"row"} gap={"8px"}>
              <Grid xs={2} item>
                <AutocompleteDriver
                  name={"nickName"}
                  onChange={(value) => {
                    methods.setValue("nickName", value?.nickName);
                  }}
                />
              </Grid>

              <Grid xs={2} item>
                {/* <AutocompleteDriver
                  label="Cód. Integração"
                  keyCode="integrationCode"
                  name={"integrationCode"}
                  onChange={(value) => {
                    methods.setValue("integrationCode", value?.integrationCode);
                  }}
                /> */}
                <Controller
                  name="integrationCode"
                  control={methods.control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                            opacity: 1,
                          },
                        }}
                        label="Cód. Integração"
                        {...field}
                        value={field.value}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid xs={2} item>
                <Controller
                  name="admission"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="Data de Admissão"
                      {...field}
                      error={error?.message}
                      value={
                        field.value
                          ? dayjs(dayjs(field.value).format("YYYY-MM-DD"))
                          : null
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
          >
            <GridSearchIcon />
          </Button>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
