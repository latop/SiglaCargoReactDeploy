import {
  fetchJourneysByPeriod,
  JourneysByPeriodParams,
} from "@/services/schedule";
import { JourneysByPeriodResponse } from "@/interfaces/schedule";
import useSWR from "swr";

export const useJourneysByPeriod = (params: JourneysByPeriodParams) => {
  const { data, error, isLoading } = useSWR<JourneysByPeriodResponse>(
    Object.keys(params).length > 0 ? { url: "/drivers", args: params } : null,
    fetchJourneysByPeriod,
  );

  return {
    trips: data?.trips,
    drivers: data?.drivers,
    error,
    isLoading,
  };
};
