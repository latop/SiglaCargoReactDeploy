import { SWRConfiguration } from "swr";
import useSWRInfinite from "swr/infinite";
import { DailyTripResponse } from "@/interfaces/daily-trip";
import { useSearchParams } from "next/navigation";
import { fetchLines } from "@/services/lines";

export const useLines = (options?: SWRConfiguration) => {
  const searchParams = useSearchParams();
  const params = {
    fleetGroupCode: searchParams.get("fleetGroupCode"),
    fleetGroupId: searchParams.get("fleetGroupId"),
    locationDestId: searchParams.get("locationDestId"),
    locationOrigId: searchParams.get("locationOrigId"),
    tripDate: searchParams.get("tripDate"),
    sto: searchParams.get("sto"),
    flgStatus: searchParams.get("flgStatus"),
  };

  const getKey = (pageIndex: number, previousPageData: DailyTripResponse) => {
    if (!params.tripDate) return null;
    if (previousPageData && !previousPageData.hasNext) return null;
    return {
      url: "/lines",
      args: { ...params, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };
  const { data, error, isLoading, mutate, size, setSize, isValidating } =
    useSWRInfinite<DailyTripResponse>(getKey, fetchLines, {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      ...options,
    });

  const lines = data?.map((page) => page).flat() || [];
  console.log({ lines, size });

  const isEmpty = !isLoading && lines?.length === 0 && !error;

  const isLoadingMore = isValidating;
  const hasNext = data?.[data.length - 1]?.hasNext;

  // const isReachingEnd = !hasNext && !isEmpty;

  const loadMoreLines = (page: number) => {
    if (hasNext && !isLoadingMore) {
      setSize(page);
    }
  };

  const hasData = !isEmpty && !isLoading && !error && !isLoadingMore;
  return {
    lines,
    error,
    isEmpty,
    hasData,
    mutate,
    loadMoreLines,
    size,
    // isReachingEnd,
    isLoading: isLoadingMore || isLoading,
    setSize,
    isValidating,
  };
};
