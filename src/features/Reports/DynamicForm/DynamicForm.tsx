import { DatePicker } from "@/components/DatePicker";
import { Box, Grid, TextField } from "@mui/material";
import dayjs from "dayjs";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";

dayjs.extend(customParseFormat);

export function DynamicForm({
  parameters,
  types,
  conditions,
}: {
  reportCode: string;
  parameters: string[];
  types: string[];
  conditions: string[];
}) {
  const methods = useFormContext();

  const renderField = (param: string, type: string, condition: string) => {
    if (param === "Cód. Localidade") {
      return (
        <Grid item xs={2}>
          <AutocompleteLocation key={param} name={param} label={param} />
        </Grid>
      );
    }

    if (param === "Cód. Frota") {
      return (
        <Grid item xs={2}>
          <AutocompleteFleetGroup key={param} name={param} />
        </Grid>
      );
    }

    if (param === "Placa") {
      return (
        <Grid item xs={2}>
          <AutocompleteTruck
            key={param}
            name={param}
            label={param}
            onChange={(e) => {
              methods.setValue("licensePlate", e?.licensePlate ?? "");
            }}
          />
        </Grid>
      );
    }

    return (
      <Controller
        key={param}
        name={param}
        control={methods.control}
        defaultValue=""
        rules={{ required: condition === "obligatory" }}
        render={({ field }) =>
          type === "datetime" ? (
            <Grid item>
              <DatePicker label={param} {...field} />
            </Grid>
          ) : (
            <Grid item>
              <TextField
                {...field}
                label={param}
                fullWidth
                margin="normal"
                required={condition === "obligatory"}
              />
            </Grid>
          )
        }
      />
    );
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Grid container gap={1}>
          {parameters.map((param, index) =>
            renderField(param, types[index], conditions[index]),
          )}
        </Grid>
      </Box>
    </FormProvider>
  );
}
