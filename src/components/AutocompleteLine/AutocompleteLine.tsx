import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useLine } from "@/hooks/useLine";
import debounce from "debounce";
import { Line } from "@/interfaces/daily-trip";

export function AutocompleteLine({
  name = "lineCode",
  label = "Cód. da rota",
  keyCode = "code",
}: {
  name?: string;
  label?: string;
  keyCode?: keyof Line;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const isDirty = dirtyFields[name];
  const { lines, error } = useLine({
    pageSize: 10,
    code: isDirty ? watch(name) : "",
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          forcePopupIcon={false}
          clearOnEscape
          options={lines || []}
          loadingText="Carregando..."
          defaultValue={{ code: field.value || "" } as Line}
          isOptionEqualToValue={(option: Line, value: Line) =>
            option[keyCode] === value[keyCode]
          }
          onChange={(_, value) => {
            setValue(name, value?.[keyCode] || "");
          }}
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !lines && !error
              ? "Carregando..."
              : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: Line) => option.code}
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
