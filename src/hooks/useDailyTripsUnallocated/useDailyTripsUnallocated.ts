import dayjs from "dayjs";
import { SWRConfiguration } from "swr";
import { useSearchParams } from "next/navigation";
import useSWRInfinite from "swr/infinite";
import { fetchDailyTripsUnallocated } from "@/services/schedule";
import { DailyTrip } from "@/interfaces/schedule";

interface DailyTripResponse {
  dailyTripsUnallocated: DailyTrip[];
  hasNext: boolean;
  currentPage: number;
}

export const useDailyTripsUnallocated = (options?: SWRConfiguration) => {
  const searchParams = useSearchParams();

  const params = {
    startDate: searchParams.get("startDate")
      ? dayjs(searchParams.get("startDate")).format("YYYY-MM-DD")
      : null,
    endDate: searchParams.get("endDate")
      ? dayjs(searchParams.get("endDate")).format("YYYY-MM-DD")
      : null,
  };

  const getKey = (pageIndex: number, previousPageData: DailyTripResponse) => {
    if (!Object.values(params).some(Boolean)) return null;
    if (previousPageData && !previousPageData.hasNext) return null;
    return {
      url: "/daily-trip-unallocated",
      args: { ...params, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };

  const { data, error, isLoading, size, setSize, isValidating, mutate } =
    useSWRInfinite<DailyTripResponse>(getKey, fetchDailyTripsUnallocated, {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      ...options,
    });

  const normalizeDailyTripsUnallocated = (currentData: DailyTrip) => ({
    ...currentData,
    startPlanned: currentData?.sectionsUnallocated?.[0].startPlanned,
    endPlanned:
      currentData?.sectionsUnallocated?.[
        currentData.sectionsUnallocated.length - 1
      ].endPlanned,
  });

  const hasNext = data?.[data.length - 1]?.hasNext;
  const dailyTripsUnallocated = data
    ?.map((page) => page.dailyTripsUnallocated)
    ?.flat()
    ?.map(normalizeDailyTripsUnallocated);

  const selectedDailyTrip = dailyTripsUnallocated?.find(
    (trip) => trip.selected === true,
  );

  const removeDailyTrip = (dailyTripId: string) => {
    const newDailyTrips = data?.map((page) => ({
      ...page,
      dailyTripsUnallocated: page.dailyTripsUnallocated.filter(
        (trip) => trip.dailyTripId !== dailyTripId,
      ),
    }));

    mutate(newDailyTrips, false);
  };

  const selectDailyTrip = (dailyTripId: string) => {
    const newDailyTrips = data?.map((page) => ({
      ...page,
      dailyTripsUnallocated: page.dailyTripsUnallocated.map((trip) => ({
        ...trip,
        selected: trip.dailyTripId === dailyTripId,
      })),
    }));

    mutate(newDailyTrips, false);
  };

  return {
    dailyTripsUnallocated,
    selectedDailyTrip,
    removeDailyTrip,
    selectDailyTrip,
    error,
    isLoading,
    hasNext,
    isValidating,
    size,
    setSize,
  };
};
