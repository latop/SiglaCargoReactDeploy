import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useDrivers } from "@/hooks/useDrivers";
import { Driver } from "@/interfaces/driver";
import debounce from "debounce";

export function AutocompleteDriver() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { drivers, error } = useDrivers({
    pageSize: 10,
    nickName: watch("nickName"),
  });

  return (
    <Controller
      name="nickName"
      control={control}
      render={({ field }) => (
        <Autocomplete
          clearOnEscape
          options={drivers || []}
          loadingText="Carregando..."
          defaultValue={{ nickName: field.value } as Driver}
          isOptionEqualToValue={(option: Driver, value: Driver) =>
            option.nickName === value.nickName
          }
          onChange={(_, value) => setValue("nickName", value?.nickName || "")}
          noOptionsText={
            !field.value
              ? "Digite o nome do motorista"
              : !drivers && !error
              ? "Carregando..."
              : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: Driver) => option.nickName}
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              onChange={debounce(field.onChange, 300)}
              variant="outlined"
              fullWidth
              label="Motorista"
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message?.toString()}
            />
          )}
        />
      )}
    />
  );
}
