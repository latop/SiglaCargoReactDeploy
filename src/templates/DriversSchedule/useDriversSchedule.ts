import { useMemo } from "react";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useSearchParams } from "next/navigation";
import { Trip } from "@/interfaces/schedule";
import { useDailyTripsUnallocated } from "@/hooks/useDailyTripsUnallocated";

interface JourneySearchParams {
  startDate?: string;
  endDate?: string;
  nickName?: string;
  fleetGroupCode?: string;
  locationGroupCode?: string;
  positionCode?: string;
}

const PAGE_SIZE = 10;

export function useDriverSchedule() {
  const params = useSearchParams();
  const searchParams: Partial<JourneySearchParams> = useMemo(() => {
    const tempSearchParams: Partial<JourneySearchParams> = {};
    const paramKeys: (keyof JourneySearchParams)[] = [
      "startDate",
      "endDate",
      "nickName",
      "fleetGroupCode",
      "locationGroupCode",
      "positionCode",
    ];

    paramKeys.forEach((key) => {
      const value = params.get(key);
      if (value !== null) {
        tempSearchParams[key] = value;
      }
    });

    return tempSearchParams;
  }, [params]);

  const {
    trips,
    drivers,
    hasNext,
    isLoading: loadingJourneys,
    size,
    setSize,
    updateTrip,
    isValidating,
  } = useJourneysByPeriod({
    ...searchParams,
    pageSize: PAGE_SIZE,
  });

  const { dailyTripsUnallocated, isLoading: loadingTripsUnallocated } =
    useDailyTripsUnallocated({
      startDate: params.get("startDate") ?? "",
      endDate: params.get("endDate") ?? "",
      pageSize: 20,
      pageNumber: 1,
    });

  const isLoading = loadingJourneys || loadingTripsUnallocated;

  const hasRelevantParams = Object.keys(searchParams).length > 0;

  const handleUpdateTrip = ({
    tripId,
    newStartPlanned,
    newEndPlanned,
    newDriverId,
  }: {
    tripId: string;
    newStartPlanned: string;
    newEndPlanned: string;
    newDriverId: string;
  }) => {
    if (!trips || !drivers) return;

    const tripIndex = trips.findIndex((trip: Trip) => trip.id === tripId);
    const currentTrip = trips[tripIndex];
    const updatedTrip = {
      ...currentTrip,
      startPlanned: newStartPlanned,
      endPlanned: newEndPlanned,
      driverId: newDriverId,
    };
    updateTrip(updatedTrip);
  };

  const isEmpty = !isLoading && !trips?.length && !drivers?.length;
  const isLoadingMore =
    isValidating ||
    (size > 0 && drivers && typeof drivers[size - 1] === "undefined");

  const isReachingEnd = !hasNext;

  const loadMore = () => {
    if (hasNext && !isLoadingMore) {
      setSize((prevSize) => prevSize + 1);
    }
  };

  return {
    trips,
    drivers,
    dailyTripsUnallocated: dailyTripsUnallocated?.slice(0, 20),
    isLoading,
    isEmpty,
    showContent: hasRelevantParams,
    updatedTrip: handleUpdateTrip,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  };
}
