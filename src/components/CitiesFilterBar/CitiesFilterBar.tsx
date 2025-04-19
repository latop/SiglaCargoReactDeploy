"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { FormProvider } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { useCitiesFilterBar } from "./useCitiesFilterBar";
import { AutocompleteStates } from "../AutocompleteStates";

dayjs.extend(customParseFormat);

export function CitiesFilterBar() {
  const { methods, onClearParams, onSubmit, handleAddCity } =
    useCitiesFilterBar();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <Box display={"flex"} gap="16px">
          <form style={{ width: "100%", display: "flex" }}>
            <Grid
              container
              justifyContent="space-between"
              gap="16px"
              direction={"row"}
            >
              <Grid container alignItems="flex-start" width="100%" gap="16px">
                <Grid xs={2} item>
                  <AutocompleteStates
                    name="stateName"
                    label="Estado"
                    onChange={(field) => {
                      methods.setValue("stateId", field?.id || "");
                      methods.setValue("stateCode", field?.code || "");
                      methods.setValue("stateName", field?.name || "");
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Box
            display="flex"
            justifyContent={"space-between"}
            maxWidth={"270px"}
            width={"100%"}
          >
            <Button color="primary" onClick={onClearParams} variant="outlined">
              Limpar
            </Button>
            <Button onClick={handleAddCity} variant="outlined">
              Adicionar
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
