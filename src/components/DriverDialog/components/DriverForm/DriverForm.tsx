import React from "react";
// import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { DriverTabs } from "../DriverTabs/DriverTabs";

dayjs.extend(customParseFormat);

export const DriverForm = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="12px" mt="5px">
        <Box
          gap="10px"
          display="flex"
          flexDirection="column"
          maxHeight={"300px"}
        >
          <DriverTabs />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
