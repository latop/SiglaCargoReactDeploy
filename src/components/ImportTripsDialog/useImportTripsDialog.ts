"use client";

import { useHash } from "@/hooks/useHash";
import { fetchGtmById } from "@/services/import-trips";
import React from "react";
import useSWR from "swr";
import { z } from "zod";

const schema = z.object({
  code: z.string(),
  codeIntegration1: z.string().optional(), //gps
  codeIntegration2: z.string().optional(), // TMS
  name: z.string(),
  cityId: z.string().optional(),
  city: z.record(z.any()).optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  locationGroup: z.record(z.any()).optional(),
  locationGroupId: z.string().optional().nullable(),
  locationTypeId: z.string(),
  locationType: z.record(z.any()).optional(),
  timezoneId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type LocationFormType = z.infer<typeof schema>;

export const useImportTripsDialog = () => {
  const [hash] = useHash();
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isPinned, setIsPinned] = React.useState(true);
  const importedTripId = (hash as string)?.match(/#importedTripId-(.+)/)?.[1];

  const getKey = () => {
    if (importedTripId) {
      return {
        url: `/trips/${importedTripId}`,
        id: importedTripId,
      };
    }
    return null;
  };
  const {
    data: importedTrip,
    isLoading,
    isValidating,
  } = useSWR(getKey, fetchGtmById, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });
  const tripGTMS = importedTrip?.tripGTMS;
  const tripGTMSDetails = importedTrip?.tripGTMSDetails;

  return {
    tripGTMS,
    tripGTMSDetails,
    importedTripId,
    isLoading: isLoading || isValidating,
    isFullscreen,
    setIsFullscreen,
    isPinned,
    setIsPinned,
  };
};
