/* eslint-disable prettier/prettier */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "debounce";
import { State } from "@/interfaces/parameters";
import { useStates } from "@/hooks/useStates";

export function AutocompleteStates({
  name = "name",
  label = "Estados",
  keyCode = "name",
  onChange,

}: {
  name?: string;
  label?: string;
  keyCode?: keyof State;
  onChange?: (value: State | null) => void;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const isDirty = dirtyFields[name];
  const { states, error } = useStates({
    stateName: isDirty ? watch(name) : "",
  });

  const handleChange = (_: unknown, value: State | null) => {
    if (onChange) {
      onChange(value);
    } else {
      setValue("id", value?.id || "");
      setValue("code", value?.code || "");

    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          forcePopupIcon={false}
          clearOnEscape
          options={states || []}
          loadingText="Carregando..."
          defaultValue={{ [keyCode]: field.value?.[keyCode] || "" } as State}
          isOptionEqualToValue={(option: State, value: State) =>
            option[keyCode] === value[keyCode]
          }
          onChange={handleChange}
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !states && !error
                ? "Carregando..."
                : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: State) => option?.name}
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
            />
          )}
        />
      )}
    />
  );
}
