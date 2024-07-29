import { DatePicker } from "@/components/DatePicker";
import { Box, Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";
import { AutocompleteFleetGroup } from "@/components/AutocompleteFleetGroup";

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

  return (
    <FormProvider {...methods}>
      <Box>
        {parameters.map((param, index) =>
          param === "Cód. Localidade" ? (
            <AutocompleteLocation key={param} name={param} label={param} />
          ) : param === "Cód. Frota" ? (
            <AutocompleteFleetGroup key={param} name={param} />
          ) : (
            <Controller
              key={param}
              name={param}
              control={methods.control}
              defaultValue=""
              rules={{ required: conditions[index] === "obligatory" }}
              render={({ field }) =>
                types[index] === "datetime" ? (
                  <DatePicker label={param} {...field} />
                ) : (
                  <TextField
                    {...field}
                    label={param}
                    fullWidth
                    margin="normal"
                    required={conditions[index] === "obligatory"}
                  />
                )
              }
            />
          ),
        )}
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </FormProvider>
  );
}
