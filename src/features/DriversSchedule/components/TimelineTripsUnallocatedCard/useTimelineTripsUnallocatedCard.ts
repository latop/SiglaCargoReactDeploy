import { useDailyTripsUnallocated } from "@/hooks/useDailyTripsUnallocated";

export function useTimelineTripsUnallocatedCard() {
  const {
    dailyTripsUnallocated,
    isLoading,
    hasNext,
    size: size,
    setSize: setSize,
    isValidating,
  } = useDailyTripsUnallocated();

  const isLoadingMore =
    isValidating ||
    (size > 0 &&
      dailyTripsUnallocated &&
      typeof dailyTripsUnallocated[size - 1] === "undefined");

  const isReachingEnd = !hasNext;

  const loadMore = () => {
    if (hasNext && !isLoadingMore) {
      setSize((prevSize) => prevSize + 1);
    }
  };

  const isEmpty =
    !isLoading && dailyTripsUnallocated && dailyTripsUnallocated?.length <= 0;

  return {
    dailyTripsUnallocated,
    isLoading,
    loadMore,
    isLoadingMore: isLoadingMore && !isLoading,
    isEmpty,
    isReachingEnd,
  };
}
