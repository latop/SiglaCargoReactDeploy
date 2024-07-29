"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReportsResponse } from "@/interfaces/reports";
import { Box, Button } from "@mui/material";
import { DynamicForm } from "../DynamicForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useReportAccordion } from "./useReportAccordion";
import { FormProvider } from "react-hook-form";
import DownloadIcon from "@mui/icons-material/Download";

export function ReportAccordion({
  data,
}: {
  data: ReportsResponse[] | undefined;
}) {
  const { onSubmit, methods } = useReportAccordion();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box>
            {data?.map((item) => (
              <Accordion
                key={item.code}
                sx={{
                  padding: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={500}>{item.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm
                    reportCode={item.code}
                    parameters={item.parameterName}
                    types={item.parameterType}
                    conditions={item.parameterCondition}
                  />
                  <Box
                    mt={1}
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: 200,
                    }}
                  >
                    <Button type="submit" variant="contained" color="primary">
                      Enviar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        display: "flex",
                        gap: 0.5,
                      }}
                    >
                      Baixar <DownloadIcon fontSize="inherit" />
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
