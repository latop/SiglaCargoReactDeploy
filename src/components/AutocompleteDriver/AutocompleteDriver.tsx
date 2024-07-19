/* eslint-disable prettier/prettier */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useDrivers } from "@/hooks/useDrivers";
import { Driver } from "@/interfaces/driver";
import debounce from "debounce";

export function AutocompleteDriver({
  name = "nickName",
  keyCode = "nickName",
  label,
}: {
  name?: string;
  keyCode?: keyof Driver;
  label?: string;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { drivers, error } = useDrivers({
    pageSize: 10,
    nickName: watch(name),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_: any, value: Driver | null) => {
    setValue("nickName", value?.nickName || "");
    setValue("driverId", value?.id || "");
    setValue(name, value?.[keyCode] || "");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        (
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
                onChange={debounce(field.onChange, 300)}
                variant="outlined"
                fullWidth
                label={label ? label : "Motorista"}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message?.toString()}
              />
            )}
          />
        )
      )}
    />
  );
}
