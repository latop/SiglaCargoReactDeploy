/* eslint-disable prettier/prettier */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Skeleton, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "debounce";
import { City } from "@/interfaces/parameters";
import { useCitiesQuery } from "@/hooks/useCities/useCitiesQuery";

export function AutocompleteCities({
  name = "name",
  label = "Cidades",
  keyCode = "name",
  onChange,
  hasSkeleton = false,
}: {
  name?: string;
  label?: string;
  keyCode?: keyof City;
  onChange?: (value: City | null) => void;
  hasSkeleton?: boolean;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const isDirty = dirtyFields[name];
  const { data: cities = [], error, isFetching } = useCitiesQuery({
    cityName: isDirty ? watch(name) : "",
  }, {
    queryKey: ["cities", { cityName: isDirty ? watch(name) : "" }],
    staleTime: 0
  });

  const handleChange = (_: unknown, value: City | null) => {
    if (onChange) {
      onChange(value);
    } else {
      setValue("id", value?.id || "");
      setValue("code", value?.code || "");
    }
  };


  if (hasSkeleton && isFetching) return <Skeleton width={"100%"} height={"100%"} />;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          forcePopupIcon={false}
          clearOnEscape
          options={cities || []}
          loadingText="Carregando..."
          defaultValue={{ [keyCode]: field.value?.[keyCode] || "" } as City}
          isOptionEqualToValue={(option: City, value: City) =>
            option[keyCode] === value[keyCode]
          }
          onChange={handleChange}
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !cities && !error
                ? "Carregando..."
                : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: City) => option?.name}
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
