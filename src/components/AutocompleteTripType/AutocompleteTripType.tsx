import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTripType } from "@/hooks/useTripType";
import debounce from "debounce";
import { TripType } from "@/interfaces/trip";

export function AutocompleteTripType({
  name = "tripTypeCode",
  label = "Tipo de viagem",
  keyCode = "code",
}: {
  name?: string;
  label?: string;
  keyCode?: keyof TripType;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const isDirty = dirtyFields[name];
  const { tripTypes, error } = useTripType({
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
          options={tripTypes || []}
          loadingText="Carregando..."
          defaultValue={{ code: field.value || "" } as TripType}
          isOptionEqualToValue={(option: TripType, value: TripType) =>
            option[keyCode] === value[keyCode]
          }
          onChange={(_, value) => {
            setValue(name, value?.[keyCode] || "");
          }}
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !tripTypes && !error
              ? "Carregando..."
              : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: TripType) => option.code}
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
