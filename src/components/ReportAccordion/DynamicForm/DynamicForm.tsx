/* eslint-disable prettier/prettier */
import { Box, Button, Grid } from "@mui/material";
import { Controller, FormProvider } from "react-hook-form";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";
import { DatePicker } from "@/components/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";

import DownloadIcon from "@mui/icons-material/Download";
import { useReports } from "@/hooks/useReports";

dayjs.extend(customParseFormat);
export function DynamicForm({
  reportCode,
  parameters,
  types,
  conditions,
}: {
  reportCode: string;
  parameters: string[];
  types: string[];
  conditions: string[];
}) {

  const { methods, onSubmit, handleDownload, isFileAvailable } = useReports();
  const { handleSubmit } = methods;


  const renderField = (param: string, type: string, condition: string) => {
    if (param === "Cód. Localidade") {
      return (
        <Grid item xs={2}>
          <AutocompleteLocation key={param} />
        </Grid>
      );
    }

    if (param === "Cód. Frota") {
      return (
        <Grid item xs={2}>
          <AutocompleteFleetGroup key={param} />
        </Grid>
      );
    }

    if (param === "Placa") {
      return (
        <Grid item xs={2}>
          <AutocompleteTruck
            onChange={(e) => {
              methods.setValue("licensePlate", e?.licensePlate);
            }}
          />
        </Grid>
      );
    }

    return (
      <Controller
        key={param}
        name={
          param === "Início"
            ? "startDate"
            : param === "Fim"
              ? "endDate"
              : "dtRef"
        }
        control={methods.control}
        rules={{ required: condition === "obligatory" }}
        render={({ field }) => (
          <Grid item>
            <DatePicker label={param} {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format("YYYY-MM-DD"))}
            />
          </Grid>
        )}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Grid container gap={1}>
              {parameters.map((param, index) =>
                renderField(param, types[index], conditions[index]),
              )}

              <Grid container gap={1} mt={1}>
                <Button type="submit" variant="contained" color="primary" onClick={() => {
                  methods.setValue("reportCode", reportCode)

                }}>
                  Enviar
                </Button>
                {isFileAvailable && <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    display: "flex",
                    gap: 0.5,
                  }}
                  id="downloadReport"
                  onClick={() => handleDownload(reportCode)}
                >
                  Baixar <DownloadIcon fontSize="inherit" />
                </Button>}
              </Grid>
            </Grid>
          </Box>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
