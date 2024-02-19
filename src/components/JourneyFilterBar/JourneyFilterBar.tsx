import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { TextField, Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@/components/DatePicker";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter, useSearchParams } from "next/navigation";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface FormFields {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  nickName?: string;
  fleetGroupCode?: string;
  locationGroupCode?: string;
  positionCode?: string;
}

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  {
    message: "Expected Date or dayjs object, received something else",
  },
);

const schema = z.object({
  startDate: dateOrDayjsSchema.optional(),
  endDate: dateOrDayjsSchema.optional(),
  nickName: z.string().optional(),
  fleetGroupCode: z.string().optional(),
  locationGroupCode: z.string().optional(),
  positionCode: z.string().optional(),
});

export function JourneyFilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: dayjs(params.get("startDate")) || dayjs(),
      endDate: dayjs(params.get("endDate")) || dayjs().add(7, "days"),
      nickName: params.get("nickName") || "",
      fleetGroupCode: params.get("fleetGroupCode") || "",
      locationGroupCode: params.get("locationGroupCode") || "",
      positionCode: params.get("positionCode") || "",
    },
  });

  const onSubmit = (data: FormFields) => {
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (dayjs(value).isValid()) {
        query.append(key, dayjs(value).format("YYYY-MM-DD"));
      } else if (value) {
        query.append(key, value);
      }
    });

    router.push(`/drivers-schedule?${query.toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          xs={12}
          alignItems="center"
          spacing={2}
          sx={{
            margin: "20px 0",
          }}
        >
          <Grid item xs={2}>
            <Controller
              name="startDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Data de início"
                  error={error?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="endDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Data de fim"
                  error={error?.message}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={1.5}>
            <Controller
              name="nickName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Motorista"
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={1.5}>
            <Controller
              name="fleetGroupCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Cód da frota"
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={1.9}>
            <Controller
              name="locationGroupCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Cód da localização"
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Controller
              name="positionCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Cód da posição"
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "54px" }}
            >
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
}
