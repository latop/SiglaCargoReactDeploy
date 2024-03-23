import { useMemo } from "react";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useSearchParams } from "next/navigation";
import { DailyTripSection, Trip } from "@/interfaces/schedule";
import { useDailyTripsUnallocated } from "@/hooks/useDailyTripsUnallocated";

interface JourneySearchParams {
  startDate?: string;
  endDate?: string;
  nickName?: string;
  fleetGroupCode?: string;
  locationGroupCode?: string;
  positionCode?: string;
}

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
    isLoading: isLoadingJourneys,
    size: sizeDrivers,
    setSize: setSizeDrivers,
    updateTrip,
    addNewTrips,
    isValidating: isValidatingDrivers,
  } = useJourneysByPeriod();

  const {
    dailyTripsUnallocated,
    isLoading: isLoadingTripsUnallocated,
    hasNext: hasNextTripsUnallocated,
    size: sizeTripsUnallocated,
    setSize: setSizeTripsUnallocated,
    isValidating: isValidatingTripsUnallocated,
  } = useDailyTripsUnallocated();

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

  const isEmpty = !isLoadingJourneys && !trips?.length && !drivers?.length;

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

  function findTripBySectionId(sectionId: string) {
    if (!dailyTripsUnallocated) return null;

    for (const trip of dailyTripsUnallocated) {
      const section = trip.sectionsUnallocated.find(
        (section: DailyTripSection) => section.dailyTripSectionId === sectionId,
      );
      if (section) {
        return trip;
      }
    }
    return null;
  }

  const handleAllocateDriver = (dailyTripId: string, driverId: string) => {
    const currentDriver = drivers?.find(
      (driver) => driver.driverId === driverId,
    );
    const currentDailyTripUnallocated = findTripBySectionId(dailyTripId);

    if (!currentDriver || !currentDailyTripUnallocated) return;

    const newTrips = currentDailyTripUnallocated.sectionsUnallocated.map(
      (section) => {
        const newTrip: Trip = {
          id: section.dailyTripSectionId,
          startPlanned: section.startPlanned,
          endPlanned: section.endPlanned,
          driverId: driverId,
          driverName: currentDriver.driverName,
          locationOrigCode: section.locOrig,
          locationDestCode: section.locDest,
        };
        return newTrip;
      },
    );
    addNewTrips(newTrips);
  };

  return {
    trips,
    drivers,
    dailyTripsUnallocated,
    isLoadingJourneys,
    isLoadingTripsUnallocated,
    handleAllocateDriver,
    isEmpty,
    showContent: hasRelevantParams,
    updatedTrip: handleUpdateTrip,
    isLoadingMoreDrivers,
    isReachingEndDrivers,
    loadMoreDrivers,
    loadMoreTripsUnallocated,
    isLoadingMoreTripsUnallocated,
    isReachingEndTripsUnallocated,
  };
}
