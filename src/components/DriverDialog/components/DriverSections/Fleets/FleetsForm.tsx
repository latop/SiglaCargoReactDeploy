import { useFormContext } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { DriverSectionFleets } from "./FleetsSections";
import { useAddFleetSection } from "./useAddFleetSection";
import { EmptyTruck } from "@/components/EmptyTruck";

export function FleetsForm() {
  const { watch } = useFormContext();
  const { handleAddStep } = useAddFleetSection();
  const driverFleets = watch("driverFleets");
  const hasDriverFleets = driverFleets && !!driverFleets?.length;

  return (
    <Box display={"flex"} flexDirection={"column"} flex={1} gap={"0.5rem"}>
      {hasDriverFleets &&
        driverFleets?.map((_: unknown, index: number) => (
          <DriverSectionFleets key={index} seq={index} />
        ))}
      {!hasDriverFleets && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ opacity: 0.5 }}
        >
          <EmptyTruck width={70} height={70} />
          <Typography>Adicione seções</Typography>
        </Box>
      )}
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
