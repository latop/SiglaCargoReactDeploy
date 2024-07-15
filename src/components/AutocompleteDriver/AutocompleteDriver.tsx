import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useDrivers } from "@/hooks/useDrivers";
import { Driver } from "@/interfaces/driver";
import debounce from "debounce";

export function AutocompleteDriver({
  name = "nickName",
  keyCode = "nickName",
  onChange,
}: {
  name?: string;
  keyCode?: keyof Driver;
  onChange?: (value: Driver | null) => void;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [value, setLocalValue] = useState(watch(name));

  const { drivers, error } = useDrivers({
    pageSize: 10,
    nickName: value,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_: any, value: Driver | null) => {
    if (onChange) {
      onChange(value);
    } else {
      setValue("nickName", value?.nickName || "");
      setValue("driverId", value?.id || "");
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          clearOnEscape
          forcePopupIcon={false}
          options={drivers || []}
          loadingText="Carregando..."
          defaultValue={{ [keyCode]: field.value ?? "" } as Driver}
          isOptionEqualToValue={(option: Driver, value: Driver) =>
            option[keyCode] === value[keyCode]
          }
          onChange={handleChange}
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
              onChange={debounce((e) => {
                setLocalValue(e.target.value);
              }, 300)}
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
