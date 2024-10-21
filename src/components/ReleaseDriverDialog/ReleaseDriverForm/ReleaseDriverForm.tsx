import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { AutocompleteDriver } from "@/components/AutocompleteDriver";
import { AutocompleteTruck } from "@/components/AutocompleteTruck";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const ReleaseDriverForm = () => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display="flex" flexDirection="column" gap="20px">
        <Box display="flex" flexDirection="row" gap="10px" flexWrap={"wrap"}>
          <Box sx={{ flexBasis: "135px" }}>
            <Controller
              name="saida"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="SAIDA"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <Controller
              name="entrega"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="ENTREGA"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <Controller
              name="demanda"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="DEMANDA"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <Controller
              name="destino"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="DESTINO"
                    {...field}
                    value={field.value}
                  />
                );
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <AutocompleteDriver
              label={"Motorista Planejado"}
              disabled
              name="motoristaPlan"
              onChange={(value) => {
                methods.setValue("motoristaPlan", value?.nickName);
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <AutocompleteTruck
              label="Veículo Planejado"
              name="veiculoPlan"
              disabled
              onChange={(value) => {
                console.log(value?.licensePlate);
                methods.setValue("veiculoPlan", value?.licensePlate);
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <AutocompleteDriver
              label="Motorista liberado"
              name="motoristaLiberado"
              onChange={(value) => {
                methods.setValue("motoristaLiberado", value?.nickName);
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <AutocompleteTruck
              label="Veículo Liberado"
              name="veiculoLiberado"
              onChange={(value) => {
                methods.setValue("veiculoLiberado", value?.licensePlate);
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <Controller
              name="mdfe"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="MDFE"
                    type="number"
                    {...field}
                    value={field.value}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.slice(0, 12);
                    }}
                    inputProps={{
                      maxLength: 12,
                    }}
                  />
                );
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "135px" }}>
            <Controller
              name="cte"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="CTE"
                    {...field}
                    type="number"
                    value={field.value}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.slice(0, 10);
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                  />
                );
              }}
            />
          </Box>
          <Box sx={{ flexBasis: "425px" }}>
            <Controller
              name="obs"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        opacity: 1,
                      },
                    }}
                    label="OBS"
                    {...field}
                    value={field.value}
                    inputProps={{ maxLength: 50 }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.slice(0, 50);
                    }}
                  />
                );
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box gap="10px" display="flex" flexDirection="column"></Box>
    </LocalizationProvider>
  );
};
