import {
  fetchJourneysByPeriod,
  JourneysByPeriodParams,
} from "@/services/schedule";
import { JourneysByPeriodResponse } from "@/interfaces/schedule";
import useSWR from "swr";

export const useJourneysByPeriod = (params: JourneysByPeriodParams) => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  const { data, error, isLoading } = useSWR<JourneysByPeriodResponse>(
    Object.keys(params).length > 0
      ? `/get-journeys-by-period?${queryParams}`
      : null,
    () => fetchJourneysByPeriod(params) as Promise<JourneysByPeriodResponse>,
  );

  return {
    trips: data?.trips,
    drivers: data?.drivers,
    error,
    isLoading,
  };
};
