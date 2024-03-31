import * as React from "react";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import { useJourneyDetails } from "../../useJourneyDetails";

export function JourneyFormHeader({ id }: { id: string }) {
  const { isLoading, data } = useJourneyDetails(id);

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        Circuito do motorista
        <Typography variant="body2">
          {data?.nickName} - {data?.driverBase}
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
            {data?.otmProcess && (
              <Typography variant="body2">
                <strong>OTM:</strong> {data?.otmProcess}
              </Typography>
            )}
          </Box>

          {(data?.startDate || data?.endDate) && (
            <Box gap="5px" display="flex" flexDirection="column">
              {data?.startDate && (
                <Typography variant="body2">
                  <strong>Início planejado:</strong>{" "}
                  {dayjs(data?.startDate).format("DD/MM/YYYY")}
                </Typography>
              )}
              {data?.endDate && (
                <Typography variant="body2">
                  <strong>Fim planejado:</strong>{" "}
                  {dayjs(data?.endDate).format("DD/MM/YYYY")}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
