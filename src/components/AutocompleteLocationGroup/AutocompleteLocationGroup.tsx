/* eslint-disable prettier/prettier */
import React, { SyntheticEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocationGroup } from "@/hooks/useLocationGroup";
import debounce from "debounce";
import { LocationGroup } from "@/interfaces/trip";

export function AutocompleteLocationGroup({
  name = "locationGroupCode",
  keyCode = "code",
  onChange,
  label = "Cód da localização",
}: {
  name?: string;
  keyCode?: keyof LocationGroup;
  onChange?: (value: LocationGroup | null) => void;
  label?: string;

}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { locationGroups, error } = useLocationGroup({
    pageSize: 10,
    code: watch(name),
  });

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: LocationGroup | null,
  ) => {
    if (onChange) {
      onChange(value);
    } else {
      setValue(name, value?.[keyCode] || "");
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
          options={locationGroups || []}
          loadingText="Carregando..."
          defaultValue={{ [keyCode]: field.value ?? "" } as LocationGroup}
          isOptionEqualToValue={(option: LocationGroup, value: LocationGroup) =>
            option[keyCode] === value[keyCode]
          }
          onChange={handleChange}
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
              label={label}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message?.toString()}
              value={field.value ?? ""}
            />
          )}
        />
      )}
    />
  );
}
