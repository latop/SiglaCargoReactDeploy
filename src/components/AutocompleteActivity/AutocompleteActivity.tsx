import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "debounce";
import { useActivities } from "@/hooks/useActivities";
import { Activity } from "@/interfaces/parameters";

export function AutocompleteActivity() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { activities, error } = useActivities();

  const handleChange = (_, value: Activity | null) => {
    setValue("activityCode", value?.code || "");
    setValue("activityId", value?.id || "");
  };

  return (
    <Controller
      name="activityCode"
      control={control}
      render={({ field }) => (
        <Autocomplete
          clearOnEscape
          options={activities || []}
          loadingText="Carregando..."
          defaultValue={{ code: field.value } as Activity}
          isOptionEqualToValue={(option: Activity, value: Activity) =>
            option.code === value.code
          }
          onChange={handleChange}
          noOptionsText={
            !field.value
              ? "Digite o nome do motorista"
              : !activities && !error
              ? "Carregando..."
              : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: Activity) => option.code}
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              onChange={debounce(field.onChange, 300)}
              variant="outlined"
              fullWidth
              label="Atividade"
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message?.toString()}
            />
          )}
        />
      )}
    />
  );
}