import useSWR, { SWRConfiguration } from "swr";
import { fetchDailyTripsUnallocated } from "@/services/schedule";
import { DailyTrip } from "@/interfaces/schedule";

interface UseDailyTripsUnallocatedParams {
  startDate?: string;
  endDate?: string;
  pageNumber: number;
  pageSize: number;
}

interface DailyTripResponse {
  dailyTripsUnallocated: DailyTrip[];
}

export const useDailyTripsUnallocated = (
  params: UseDailyTripsUnallocatedParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<DailyTripResponse>(
    params.startDate && params.endDate
      ? { url: "/getDailyTripUnallocated", args: params }
      : null,
    fetchDailyTripsUnallocated,
    options,
  );

  return {
    dailyTripsUnallocated: data?.dailyTripsUnallocated,
    error,
    isLoading,
  };
};
