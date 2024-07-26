"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReportsResponse } from "@/interfaces/reports";

export function ReportAccordion({
  data,
}: {
  data: ReportsResponse[] | undefined;
}) {
  return (
    <div>
      {data?.map((item) => (
        <Accordion key={item.code}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item.description}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Renderização do formulário dinâmico aqui */}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
