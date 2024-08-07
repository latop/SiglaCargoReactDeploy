"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReportsResponse } from "@/interfaces/reports";
import { Box } from "@mui/material";
import { DynamicForm } from "./DynamicForm";
import { ReportSchemas } from "./DynamicForm/useDynamicForm";

export function ReportAccordion({
  data,
}: {
  data: ReportsResponse[] | undefined;
}) {
  return (
    <Box>
      {data?.map((item) => {
        return (
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
              <DynamicForm reportCode={item.code as keyof ReportSchemas} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
