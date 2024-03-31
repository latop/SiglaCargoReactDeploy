import React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Typography, colors, Chip } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DriverJourneyForm } from "../../../DriverJourneyForm";
import { useToast } from "@/hooks/useToast";
import { TaskDriver } from "@/interfaces/schedule";
import "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

export const JourneyForm = () => {
  const { addToast } = useToast();
  const { watch, setValue } = useFormContext();
  const tasksDriver = watch("tasksDriver");

  const handleDeleteDriverSchedule = (index: number) => {
    tasksDriver.splice(index, 1);
    setValue("tasksDriver", tasksDriver);
    addToast("Jornada removida com sucesso");
  };

  const countJourneys = tasksDriver?.length;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display={"flex"} flexDirection="column" gap="20px">
        <Box gap="10px" mt="5px" display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="subtitle1">Jornadas do motorista</Typography>
            {countJourneys > 0 && (
              <Chip label={countJourneys} color="default" size="small" />
            )}
          </Box>
          {tasksDriver?.length === 0 && (
            <Box display="flex">
              <Typography variant="body2" color={colors.grey[700]}>
                Não há jornadas para este motorista, adicione uma nova jornada.
              </Typography>
            </Box>
          )}

          <Box gap="16px" display="flex" flexDirection="column">
            {tasksDriver?.map((taskDriver: TaskDriver, index: number) => (
              <DriverJourneyForm
                onDelete={() => handleDeleteDriverSchedule(index)}
                key={taskDriver.seq}
                seq={taskDriver.seq - 1}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
