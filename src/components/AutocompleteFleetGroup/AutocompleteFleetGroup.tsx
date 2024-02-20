import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useFleetGroup } from "@/hooks/useFleetGroup";
import debounce from "debounce";
import { FleetGroup } from "@/interfaces/vehicle";

export function AutocompleteFleetGroup() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fleetGroups, error } = useFleetGroup({
    pageSize: 10,
    code: watch("fleetGroupCode"),
  });

  return (
    <Controller
      name="fleetGroupCode"
      control={control}
      render={({ field }) => (
        <Autocomplete
          clearOnEscape
          options={fleetGroups || []}
          loadingText="Carregando..."
          defaultValue={{ code: field.value } as FleetGroup}
          onChange={(_, value) => setValue("fleetGroupCode", value?.code || "")}
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !fleetGroups && !error
              ? "Carregando..."
              : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: FleetGroup) =>
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
              label="Cód da frota"
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message?.toString()}
            />
          )}
        />
      )}
    />
  );
}
