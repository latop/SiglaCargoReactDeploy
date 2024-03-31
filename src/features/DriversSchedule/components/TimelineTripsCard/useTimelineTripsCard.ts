import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";

export function useTimelineTripsCard() {
  const {
    drivers,
    hasNext,
    isLoading,
    size: size,
    setSize,
    isValidating,
  } = useJourneysByPeriod();

  const isEmpty = !isLoading && drivers && drivers?.length <= 0;

  const isLoadingMore =
    isValidating ||
    (size > 0 && drivers && typeof drivers[size - 1] === "undefined");

  const isReachingEnd = !hasNext;

  const loadMoreDrivers = () => {
    if (hasNext && !isLoadingMore) {
      setSize((prevSize) => prevSize + 1);
    }
  };

  return {
    isLoading,
    isEmpty,
    isLoadingMore: isLoadingMore && !isLoading,
    isReachingEnd,
    loadMoreDrivers,
  };
}
