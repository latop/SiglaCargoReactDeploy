import { DailyTrip } from "@/interfaces/daily-trip";
import { fetchDailyTripDetails } from "@/services/schedule";
import useSWR, { SWRConfiguration } from "swr";

export interface DailyTripDetailsParams {
  id?: string;
}

export const useDailyTripDetails = (
  params: DailyTripDetailsParams,
  options?: SWRConfiguration,
) => {
  console.log(params.id, "params.id");
  const { data, error, isLoading } = useSWR<DailyTrip>(
    params.id ? { url: "/daily-trip-detail", args: params } : null,
    fetchDailyTripDetails,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    },
  );

  return {
    dailyTripDetails: data,
    error,
    isLoading,
  };
};
