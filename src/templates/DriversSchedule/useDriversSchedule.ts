import { useMemo } from "react";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useSearchParams } from "next/navigation";
import { Trip } from "@/interfaces/schedule";

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
    isLoading,
    size,
    setSize,
    updateTrip,
    isValidating,
  } = useJourneysByPeriod({ ...searchParams, pageSize: PAGE_SIZE });

  const hasRelevantParams = Object.keys(searchParams).length > 0;

  const handleUpdateTrip = ({
    tripId,
    newPlannedStart,
    newPlannedStop,
    newDriverId,
  }: {
    tripId: string;
    newPlannedStart: string;
    newPlannedStop: string;
    newDriverId: string;
  }) => {
    if (!trips || !drivers) return;

    const tripIndex = trips.findIndex((trip: Trip) => trip.id === tripId);
    const currentTrip = trips[tripIndex];
    const updatedTrip = {
      ...currentTrip,
      plannedStart: newPlannedStart,
      plannedStop: newPlannedStop,
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
      console.log("entroou aqui no loadMore", size);
      setSize((prevSize) => prevSize + 1);
    }
  };

  return {
    trips,
    drivers,
    isLoading,
    isEmpty,
    showContent: hasRelevantParams,
    updatedTrip: handleUpdateTrip,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  };
}
