import React, { SyntheticEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useFleetGroup } from "@/hooks/useFleetGroup";
import debounce from "debounce";
import { FleetGroup } from "@/interfaces/vehicle";

export function AutocompleteFleetGroup({
  name = "fleetGroupCode",
  keyCode = "code",
}: {
  name?: string;
  keyCode?: keyof FleetGroup;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const isDirty = dirtyFields[name];

  const { fleetGroups, error } = useFleetGroup({
    pageSize: 10,
    code: isDirty ? watch(name) : "",
  });

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: FleetGroup | null,
  ) => {
    setValue(name, value?.[keyCode] || "");
    setValue("fleetGroupId", value?.id || "");
    setValue("fleetGroupCode", value?.code || "");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          clearOnEscape
          forcePopupIcon={false}
          options={fleetGroups || []}
          loadingText="Carregando..."
          defaultValue={{ [keyCode]: field.value ?? "" } as FleetGroup}
          isOptionEqualToValue={(option: FleetGroup, value: FleetGroup) =>
            option[keyCode] === value[keyCode]
          }
          onChange={handleChange}
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
              autoComplete="off"
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
