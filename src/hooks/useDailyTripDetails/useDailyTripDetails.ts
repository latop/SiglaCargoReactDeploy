import { DailyTripDetailsResponse } from "@/interfaces/daily-trip";
import { fetchDailyTripDetails } from "@/services/schedule";
import useSWR, { SWRConfiguration } from "swr";

export interface DailyTripDetailsParams {
  id?: string;
}

export const useDailyTripDetails = (
  params: DailyTripDetailsParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<DailyTripDetailsResponse>(
    params.id ? { url: "/daily-trip-detail", args: params } : null,
    fetchDailyTripDetails,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    },
  );

  return {
    dailyTripDetails: data?.dailyTrip,
    dailyTripSections: data?.dailyTripSections,
    error,
    isLoading,
  };
};
