import { useFormContext } from "react-hook-form";
import { DriverSectionBases } from "./BasesSection";
import { Box, Button } from "@mui/material";
import { useAddBaseSection } from "./useAddBasesSection";

export function BasesForm() {
  const { watch } = useFormContext();
  const { handleAddStep } = useAddBaseSection();
  const driverBases = watch("driverBases");

  return (
    <Box display={"flex"} flexDirection={"column"} flex={1} gap={"0.5rem"}>
      {driverBases?.map((_: unknown, index: number) => (
        <DriverSectionBases key={index} seq={index} />
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
