import { useFormContext } from "react-hook-form";
import { DriverSectionAttribuitions } from "./AttribuitionsSection";
import { Box, Button } from "@mui/material";
import { useAddAttribuitionSection } from "./useAddAttribuitionSection";

export function AttribuitionForm() {
  const { watch } = useFormContext();
  const { handleAddStep } = useAddAttribuitionSection();
  const driverAttributions = watch("driverAttributions");

  return (
    <Box display={"flex"} flexDirection={"column"} flex={1} gap={"0.5rem"}>
      {driverAttributions?.map((_: unknown, index: number) => (
        <DriverSectionAttribuitions key={index} seq={index} />
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
