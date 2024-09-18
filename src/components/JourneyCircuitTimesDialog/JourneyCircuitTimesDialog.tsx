import { Box, Grid } from "@mui/material";
import { useJourneyCircuitTimesDialog } from "./useJourneyCircuitTimesDialog";

export const JourneyCircuitTimesDialog = () => {
  const { circuitTimes } = useJourneyCircuitTimesDialog();

  return (
    <Box>
      {circuitTimes?.map((circuitTime: string) => (
        <Grid key={circuitTime} item>
          {circuitTime}
        </Grid>
      ))}
    </Box>
  );
};
