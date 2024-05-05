import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocationGroup } from "@/hooks/useLocationGroup";
import debounce from "debounce";
import { LocationGroup } from "@/interfaces/trip";

export function AutocompleteLocationGroup() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { locationGroups, error } = useLocationGroup({
    pageSize: 10,
    code: watch("locationGroupCode"),
  });

  return (
    <Controller
      name="locationGroupCode"
      control={control}
      render={({ field }) => (
        <Autocomplete
          clearOnEscape
          forcePopupIcon={false}
          options={locationGroups || []}
          loadingText="Carregando..."
          defaultValue={{ code: field.value } as LocationGroup}
          isOptionEqualToValue={(option: LocationGroup, value: LocationGroup) =>
            option.code === value.code
          }
          onChange={(_, value) =>
            setValue("locationGroupCode", value?.code || "")
          }
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !locationGroups && !error
              ? "Carregando..."
              : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: LocationGroup) =>
            option.description
              ? `${option.code} - ${option.description}`
              : option.code
          }
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              onChange={debounce(field.onChange, 300)}
              variant="outlined"
              fullWidth
              label="Cód da localização"
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message?.toString()}
            />
          )}
        />
      )}
    />
  );
}
