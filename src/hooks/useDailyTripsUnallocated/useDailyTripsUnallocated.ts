import { SWRConfiguration } from "swr";
import useSWRInfinite from "swr/infinite";
import { fetchDailyTripsUnallocated } from "@/services/schedule";
import { DailyTrip } from "@/interfaces/schedule";

interface UseDailyTripsUnallocatedParams {
  startDate?: string;
  endDate?: string;
  pageSize: number;
}

interface DailyTripResponse {
  dailyTripsUnallocated: DailyTrip[];
  hasNext: boolean;
  currentPage: number;
}

export const useDailyTripsUnallocated = (
  params: UseDailyTripsUnallocatedParams,
  options?: SWRConfiguration,
) => {
  const getKey = (pageIndex: number, previousPageData: DailyTripResponse) => {
    if (!Object.values(params).some(Boolean)) return null;
    if (previousPageData && !previousPageData.hasNext) return null;
    return {
      url: "/daily-trip-unallocated",
      args: { ...params, pageNumber: pageIndex + 1 },
    };
  };

  const { data, error, isLoading, size, setSize, isValidating } =
    useSWRInfinite<DailyTripResponse>(getKey, fetchDailyTripsUnallocated, {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateFirstPage: false,
      ...options,
    });

  console.log(data, "data");

  const hasNext = data?.[data.length - 1]?.hasNext;
  const dailyTripsUnallocated = data
    ?.map((page) => page.dailyTripsUnallocated)
    .flat();
  return {
    dailyTripsUnallocated,
    error,
    isLoading,
    hasNext,
    isValidating,
    size,
    setSize,
  };
};
