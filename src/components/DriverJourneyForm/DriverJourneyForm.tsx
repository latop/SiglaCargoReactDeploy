import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  Box,
  IconButton,
  colors,
  Icon,
  InputAdornment,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@/components/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import { AutocompleteActivity } from "../AutocompleteActivity";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import "dayjs/locale/pt-br";
dayjs.extend(customParseFormat);

interface DriverJourneyFormProps {
  onDelete: () => void;
  seq: number;
}

export const DriverJourneyForm = ({
  onDelete,
  seq,
}: DriverJourneyFormProps) => {
  const { control, getValues, setValue } = useFormContext();

  const isTravel = getValues(`tasksDriver.${seq}.type`) === "V";
  const isActivity = getValues(`tasksDriver.${seq}.type`) === "A";

  const handleSearchClick = () => {
    const lineCode = getValues(`tasksDriver.${seq}.lineCode`);
    console.log("Line code", lineCode);
  };

  const renderTravelFields = () => (
    <Grid container spacing={1}>
      <Grid item xs={1.5}>
        <Controller
          name={`tasksDriver.${seq}.demand`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Demanda"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon
                      fontSize="small"
                      onClick={handleSearchClick}
                      style={{ cursor: "pointer" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.5}>
        <Controller
          name={`tasksDriver.${seq}.lineCode`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Cód. Rota" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={1.2}>
        <Controller
          name={`tasksDriver.${seq}.locOrig`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Origem" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={1.2}>
        <Controller
          name={`tasksDriver.${seq}.locDest`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Destino" fullWidth />
          )}
        />
      </Grid>
      <Grid item xs={1.7}>
        <Controller
          name={`tasksDriver.${seq}.startPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início planejado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.7}>
        <Controller
          name={`tasksDriver.${seq}.endPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim planejado"
              error={error?.message}
              {...field}
              slotProps={{}}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`tasksDriver.${seq}.startActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início realizado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`tasksDriver.${seq}.endActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim realizado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
    </Grid>
  );

  const renderActivityFields = () => (
    <Grid container spacing={1}>
      <Grid item xs={1.6}>
        <AutocompleteActivity
          name={`tasksDriver.${seq}.activityCode`}
          onChange={(activity) => {
            setValue(`tasksDriver.${seq}.activityCode`, activity.code);
            setValue(`tasksDriver.${seq}.activityId`, activity.id);
          }}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`tasksDriver.${seq}.startPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início planejado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`tasksDriver.${seq}.endPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim planejado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`tasksDriver.${seq}.startActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início realizado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`tasksDriver.${seq}.endActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim realizado"
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
    </Grid>
  );

  const handleShowDemandDetails = () => {
    const demand = getValues(`tasksDriver.${seq}.demand`);
    console.log("Demand", demand);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        display={"flex"}
        flexDirection="column"
        gap="16px"
        padding="10px"
        bgcolor={colors.grey[100]}
        borderRadius="4px"
      >
        <Box display="flex" gap="10px" alignItems="center">
          {isTravel && renderTravelFields()}
          {isActivity && renderActivityFields()}
          <Box display="flex" gap="0" alignItems="center">
            <IconButton size="small" onClick={handleShowDemandDetails}>
              <Tooltip title="Adicionar retorno" arrow>
                <Icon component={KeyboardReturnIcon} fontSize="small" />
              </Tooltip>
            </IconButton>
            <IconButton size="small" onClick={handleShowDemandDetails}>
              <Tooltip title="Mostrar detalhes" arrow>
                <Icon component={ExpandCircleDownIcon} fontSize="small" />
              </Tooltip>
            </IconButton>
            <IconButton size="small" onClick={onDelete}>
              <Tooltip title="Remover viagem" arrow>
                <Icon component={DeleteIcon} fontSize="small" />
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
