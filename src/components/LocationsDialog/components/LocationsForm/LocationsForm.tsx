import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";
import { LocationFormType } from "../../useLocationsDialog";
import { AutocompleteCities } from "@/components/AutocompleteCities";
import { AutocompleteLocationType } from "@/components/AutocompleteLocationType";

export const LocationsForm = () => {
  const methods = useFormContext<LocationFormType>();

  return (
    <Box display="flex" flexDirection="column" gap="16px" mt="5px">
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Controller
            control={methods.control}
            name={"code"}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  label="Cód. Da Localização"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={methods.control}
            name={"name"}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                  label="Nome Da Localização"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Controller
            control={methods.control}
            name={"timezoneId"}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                  label="Fuso Horário"
                  variant="outlined"
                  fullWidth
                  value={"TIME ZONE UTC -3:00"}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <AutocompleteLocationGroup
            label="Grupo de Localização"
            name="locationGroup.code"
            onChange={(value) => {
              methods.setValue("loctionGroupId", value?.id || "");
              methods.setValue("locationGroup", value?.id || "");
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <AutocompleteLocationType
            key={methods.watch("locationTypeId")}
            name="locationType.code"
            label="Tipo de Localização"
            onChange={(value) => {
              methods.setValue("locationTypeId", value?.id || "");
              methods.setValue("locationTypeCode", value?.code || "");
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <AutocompleteCities
            label="Cidade"
            name="cityId"
            onChange={(value) => {
              methods.setValue("cityId", value?.id || "");
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Controller
            control={methods.control}
            name={"codeIntegration1"}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                  label="Cód. GPS"
                  variant="outlined"
                  fullWidth
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={methods.control}
            name={"codeIntegration2"}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                  label="Cód. TMS"
                  variant="outlined"
                  fullWidth
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={methods.control}
            name={"latitude"}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                  label="Latitude"
                  variant="outlined"
                  fullWidth
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={methods.control}
            name={"latitude"}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                  label="Longitude"
                  variant="outlined"
                  fullWidth
                />
              );
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
