import * as React from "react";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import { useJourneyDetails } from "../../useJourneyDetails";

export function JourneyFormHeader({ id }: { id: string }) {
  const { currentTrip, isLoading, data } = useJourneyDetails(id);

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        Circuito do motorista
        <Typography variant="body2">
          {currentTrip?.driverName} -{" "}
          {dayjs(currentTrip?.startPlanned).format("DD/MM/YYYY")}
        </Typography>
      </Box>
      {!isLoading && (
        <Box
          display="flex"
          gap="20px"
          alignItems="flex-end"
          paddingRight="40px"
        >
          <Box gap="5px" display="flex" flexDirection="column">
            <Typography variant="body2">
              <strong>Status:</strong> {data?.status}
            </Typography>
            {data?.otmId && (
              <Typography variant="body2">
                <strong>OTM:</strong> {data?.otmId}
              </Typography>
            )}
          </Box>

          {(data?.publishedDate || data?.awareDate) && (
            <Box gap="5px" display="flex" flexDirection="column">
              {data?.publishedDate && (
                <Typography variant="body2">
                  <strong>Publicado em:</strong>{" "}
                  {dayjs(data?.publishedDate).format("DD/MM/YYYY")}
                </Typography>
              )}
              {data?.awareDate && (
                <Typography variant="body2">
                  <strong>Avisado em:</strong>{" "}
                  {dayjs(data?.awareDate).format("DD/MM/YYYY")}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
