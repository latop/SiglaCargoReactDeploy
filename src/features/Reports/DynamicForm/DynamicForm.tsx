import { DatePicker } from "@/components/DatePicker";
import { Box, TextField } from "@mui/material";
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
      return <AutocompleteLocation key={param} name={param} label={param} />;
    }

    if (param === "Cód. Frota") {
      return <AutocompleteFleetGroup key={param} name={param} />;
    }

    if (param === "Placa") {
      return (
        <AutocompleteTruck
          key={param}
          name={param}
          label={param}
          onChange={(e) => {
            methods.setValue("licensePlate", e?.licensePlate ?? "");
          }}
        />
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
            <DatePicker label={param} {...field} />
          ) : (
            <TextField
              {...field}
              label={param}
              fullWidth
              margin="normal"
              required={condition === "obligatory"}
            />
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {parameters.map((param, index) =>
            renderField(param, types[index], conditions[index]),
          )}
        </Box>
      </Box>
    </FormProvider>
  );
}
