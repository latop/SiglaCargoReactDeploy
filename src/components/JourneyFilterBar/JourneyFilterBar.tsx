import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@/components/DatePicker";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { useRouter, useSearchParams } from "next/navigation";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AutocompleteLocationGroup } from "@/components/AutocompleteLocationGroup";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompletePosition } from "@/components/AutocompletePosition";
import "dayjs/locale/pt-br";

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
    message: "Data é obrigatório",
  },
);

const schema = z.object({
  startDate: dateOrDayjsSchema,
  endDate: dateOrDayjsSchema,
  nickName: z.string().optional(),
  fleetGroupCode: z.string().optional(),
  locationGroupCode: z.string().optional(),
  positionCode: z.string().optional(),
});

export function JourneyFilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: params.get("startDate")
        ? dayjs(params.get("startDate"))
        : dayjs(),
      endDate: params.get("endDate")
        ? dayjs(params.get("endDate"))
        : dayjs().add(7, "days"),
      nickName: params.get("nickName") || "",
      fleetGroupCode: params.get("fleetGroupCode") || "",
      locationGroupCode: params.get("locationGroupCode") || "",
      positionCode: params.get("positionCode") || "",
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: FormFields) => {
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (dayjs(value).isValid()) {
        query.append(key, dayjs(value).format("MM-DD-YYYY"));
      } else if (value) {
        query.append(key, value);
      }
    });

    router.push(`/drivers-schedule?${query.toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
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
            <Grid item xs={1.5}>
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
            <Grid item xs={1.5}>
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

            <Grid item xs={2.5}>
              <AutocompleteDriver />
            </Grid>

            <Grid item xs={1.5}>
              <AutocompleteFleetGroup />
            </Grid>

            <Grid item xs={1.9}>
              <AutocompleteLocationGroup />
            </Grid>

            <Grid item xs={2}>
              <AutocompletePosition />
            </Grid>

            <Grid item xs={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "54px" }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
