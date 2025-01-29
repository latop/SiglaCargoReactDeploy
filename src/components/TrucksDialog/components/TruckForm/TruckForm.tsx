import { AutocompleteTruck } from "@/components/AutocompleteTruck";
import { Box, Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const TruckForm = () => {
  const methods = useFormContext();
  console.log(methods);
  return (
    <Box display="flex" flexDirection="column" gap="8px" mt="5px">
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Controller name="teste" render={() => <TextField />} />
          <AutocompleteTruck name="licensePlate" />
          {/* <Controller
            control={methods.control}
            name={"name"}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              );
            }}
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
};
