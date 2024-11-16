import { useFormContext } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { EmptyTruck } from "@/components/EmptyTruck";
import { useAddPositionSection } from "./useAddPositionSection";
import { DriverSectionPositions } from "./PositionsSection";

export function PositionsForm() {
  const { watch } = useFormContext();
  const { handleAddStep } = useAddPositionSection();
  const driverBases = watch("driverPositions");
  const hasDriverBases = driverBases && !!driverBases?.length;
  return (
    <Box display={"flex"} flexDirection={"column"} flex={1} gap={"0.5rem"}>
      {hasDriverBases &&
        driverBases?.map((_: unknown, index: number) => (
          <DriverSectionPositions key={index} seq={index} />
        ))}
      {!hasDriverBases && (
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
