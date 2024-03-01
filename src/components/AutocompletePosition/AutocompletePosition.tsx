import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "debounce";
import { Position } from "@/interfaces/driver";
import { usePosition } from "@/hooks/usePosition";

export function AutocompletePosition() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { positions, error } = usePosition({
    pageSize: 10,
    code: watch("positionCode"),
  });

  return (
    <Controller
      name="positionCode"
      control={control}
      render={({ field }) => (
        <Autocomplete
          clearOnEscape
          options={positions || []}
          loadingText="Carregando..."
          defaultValue={{ code: field.value } as Position}
          isOptionEqualToValue={(option: Position, value: Position) =>
            option.code === value.code
          }
          onChange={(_, value) => setValue("positionCode", value?.code || "")}
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !positions && !error
              ? "Carregando..."
              : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: Position) => option.code}
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              onChange={debounce(field.onChange, 300)}
              variant="outlined"
              fullWidth
              label="Posição"
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message?.toString()}
            />
          )}
        />
      )}
    />
  );
}
