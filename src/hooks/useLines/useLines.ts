import { SWRConfiguration } from "swr";
import useSWRInfinite from "swr/infinite";
import { useSearchParams } from "next/navigation";
import { LinesResponse } from "@/interfaces/lines";
import { fetchLines } from "@/services/trips";

export const useLines = (options?: SWRConfiguration) => {
  const searchParams = useSearchParams();
  const params = {
    fleetGroupId: searchParams.get("fleetGroupId"),
    locationDestId: searchParams.get("locationDestId"),
    locationOrigId: searchParams.get("locationOrigId"),
    code: searchParams.get("code"),
  };

  const getKey = (pageIndex: number, previousPageData: LinesResponse) => {
    if (previousPageData && !previousPageData.hasNext) return null;

    return {
      url: "/lines",
      args: { ...params, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };
  const { data, error, isLoading, mutate, size, setSize, isValidating } =
    useSWRInfinite<LinesResponse>(getKey, fetchLines, {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      ...options,
    });

  const lines = data?.map((page) => page.lines).flat() || [];
  const totalCount = data?.[0]?.totalCount || 0;
  const isEmpty = !isLoading && lines?.length === 0 && !error;

  const isLoadingMore = isValidating;
  const hasNext = data?.[data.length - 1]?.hasNext;
  const isReachingEnd = !hasNext && !isEmpty;
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
    mutate,
    loadMoreLines,
    size,
    isReachingEnd,
    isLoading: isLoadingMore || isLoading,
    setSize,
    isValidating,
    totalCount,
    hasData,
  };
};
