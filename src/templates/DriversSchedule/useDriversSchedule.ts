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
    hasNext: hasNextJourney,
    isLoading: loadingJourneys,
    size: sizeDrivers,
    setSize: setSizeDrivers,
    updateTrip,
    isValidating: isValidatingDrivers,
  } = useJourneysByPeriod({
    ...searchParams,
    pageSize: PAGE_SIZE,
  });

  const {
    dailyTripsUnallocated,
    isLoading: loadingTripsUnallocated,
    hasNext: hasNextTripsUnallocated,
    size: sizeTripsUnallocated,
    setSize: setSizeTripsUnallocated,
    isValidating: isValidatingTripsUnallocated,
  } = useDailyTripsUnallocated({
    startDate: params.get("startDate") ?? "",
    endDate: params.get("endDate") ?? "",
    pageSize: PAGE_SIZE,
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

  const isLoadingMoreDrivers =
    isValidatingDrivers ||
    (sizeDrivers > 0 &&
      drivers &&
      typeof drivers[sizeDrivers - 1] === "undefined");

  const isLoadingMoreTripsUnallocated =
    isValidatingTripsUnallocated ||
    (sizeTripsUnallocated > 0 &&
      dailyTripsUnallocated &&
      typeof dailyTripsUnallocated[sizeTripsUnallocated - 1] === "undefined");

  const isReachingEndDrivers = !hasNextJourney;
  const isReachingEndTripsUnallocated = !hasNextTripsUnallocated;

  const loadMoreDrivers = () => {
    if (hasNextJourney && !isLoadingMoreDrivers) {
      setSizeDrivers((prevSize) => prevSize + 1);
    }
  };

  const loadMoreTripsUnallocated = () => {
    if (hasNextTripsUnallocated && !isLoadingMoreTripsUnallocated) {
      setSizeTripsUnallocated((prevSize) => prevSize + 1);
    }
  };

  return {
    trips,
    drivers,
    dailyTripsUnallocated,
    isLoading,
    isEmpty,
    showContent: hasRelevantParams,
    updatedTrip: handleUpdateTrip,
    isLoadingMoreDrivers,
    isReachingEndDrivers,
    loadMoreDrivers,
    hasNextTripsUnallocated,
    sizeTripsUnallocated,
    setSizeTripsUnallocated,
    isValidatingTripsUnallocated,
    loadMoreTripsUnallocated,
    isLoadingMoreTripsUnallocated,
    isReachingEndTripsUnallocated,
  };
}
