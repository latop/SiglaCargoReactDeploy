"use client";

import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { Controller, FormProvider } from "react-hook-form";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";

import DownloadIcon from "@mui/icons-material/Download";
import { ReportSchemas, useDynamicForm } from "./useDynamicForm";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";

dayjs.extend(customParseFormat);
export function DynamicForm({
  reportCode,
}: {
  reportCode: keyof ReportSchemas;
}) {
  const { methods, onSubmit, handleDownload, isFileAvailable, isLoading } =
    useDynamicForm(reportCode);
  const { handleSubmit } = methods;
  const RenderFields = () => {
    if (reportCode === "R01") {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Grid container gap={1}>
            <Controller
              key={reportCode}
              name={"startDate"}
              control={methods.control}
              render={({ field }) => (
                <Grid item>
                  <DatePicker label={"Início"} {...field} />
                </Grid>
              )}
            />
            <Controller
              key={reportCode}
              name={"endDate"}
              control={methods.control}
              render={({ field }) => (
                <Grid item>
                  <DatePicker label={"Fim"} {...field} />
                </Grid>
              )}
            />
            <Grid item xs={2}>
              <AutocompleteLocationGroup name="locationCode" />
            </Grid>
          </Grid>
        </Box>
      );
    }

    if (reportCode === "R02") {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Grid container gap={1}>
            <Controller
              key={reportCode}
              name={"refDate"}
              control={methods.control}
              render={({ field }) => (
                <Grid item>
                  <DatePicker label="Data Ref" {...field} />
                </Grid>
              )}
            />
            <Grid item xs={2}>
              <AutocompleteLocationGroup name="locationCode" />
            </Grid>
            <Grid item xs={2}>
              <AutocompleteFleetGroup name="fleetCode" />
            </Grid>
          </Grid>
        </Box>
      );
    }
    if (reportCode === "R03") {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Grid container gap={1}>
            <Controller
              key={reportCode}
              name={"refDate"}
              control={methods.control}
              render={({ field }) => (
                <Grid item>
                  <DatePicker label={"Data Ref"} {...field} />
                </Grid>
              )}
            />
            <Grid item xs={2}>
              <AutocompleteFleetGroup name="fleetCode" />
            </Grid>
            <Grid item xs={2}>
              <AutocompleteTruck
                name="licensePlate"
                onChange={(e) => {
                  methods.setValue("licensePlate", e?.licensePlate);
                }}
              />
            </Grid>
          </Grid>
        </Box>
      );
    }
    if (reportCode === "R04") {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Grid container gap={1}>
            <Controller
              key={reportCode}
              name={"refDate"}
              control={methods.control}
              render={({ field }) => (
                <Grid item>
                  <DatePicker label={"Data Ref"} {...field} />
                </Grid>
              )}
            />
            <Grid item xs={2}>
              <AutocompleteLocationGroup name="locationCode" />
            </Grid>
          </Grid>
        </Box>
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RenderFields />
          <Grid container gap={1} mt={1}>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                methods.setValue("reportCode", reportCode);
              }}
            >
              {!isLoading ? (
                "Enviar"
              ) : (
                <CircularProgress size={"16px"} color="inherit" />
              )}
            </Button>
            {isFileAvailable && (
              <Button
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
              </Button>
            )}
          </Grid>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
