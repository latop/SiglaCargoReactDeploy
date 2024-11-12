import { fetchDriversPaginated, FetchDriversParams } from "@/services/drivers";
import { SWRConfiguration } from "swr";
import { DriversPaginated } from "@/interfaces/driver";
import useSWRInfinite from "swr/infinite";

export const useDriversPaginated = (
  params?: FetchDriversParams,
  options?: SWRConfiguration,
) => {
  const getKey = (pageIndex: number, previousPageData: DriversPaginated) => {
    if (previousPageData && !previousPageData.hasNext) return null;

    return {
      url: "/drivers",
      args: { ...params, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };

  const { data, error, isLoading, size, setSize, isValidating } =
    useSWRInfinite<DriversPaginated>(getKey, fetchDriversPaginated, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      ...options,
    });
  const drivers = data?.map((page) => page.drivers).flat() || [];

  const totalCount = data?.[0]?.totalCount || 0;
  const isEmpty = !isLoading && drivers?.length === 0 && !error;

  const isLoadingMore = isValidating;
  const hasNext = data?.[data.length - 1]?.hasNext;
  const isReachingEnd = !hasNext && !isEmpty;
  const hasData = !!drivers?.length && !isLoading;

  const loadMoreLines = (page: number) => {
    if (hasNext && !isLoadingMore) {
      setSize(page);
    }
  };

  return {
    drivers,
    error,
    size,
    isLoading,
    isEmpty,
    isReachingEnd,
    loadMoreLines,
    totalCount,
    hasData,
  };
};
