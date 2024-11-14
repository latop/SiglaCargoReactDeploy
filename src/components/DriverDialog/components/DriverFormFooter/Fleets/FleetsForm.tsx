import { useFormContext } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { DriverSectionFleets } from "./FleetsSections";
import { useAddFleetSection } from "./useAddFleetSection";

export function FleetsForm() {
  const { watch } = useFormContext();
  const { handleAddStep } = useAddFleetSection();
  const driverAttributions = watch("driverFleets");

  return (
    <Box display={"flex"} flexDirection={"column"} flex={1} gap={"0.5rem"}>
      {driverAttributions?.map((_: unknown, index: number) => (
        <DriverSectionFleets key={index} seq={index} />
      ))}
      <Button
        onClick={handleAddStep}
        variant="outlined"
        sx={{
          width: "150px",
          marginTop: "1rem",
          alignSelf: "flex-end",
        }}
      >
        Adicionar Seção
      </Button>
    </Box>
  );
}
