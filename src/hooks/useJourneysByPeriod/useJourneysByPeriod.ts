import {
  fetchJourneysByPeriod,
  JourneysByPeriodParams,
} from "@/services/schedule";
import { JourneysByPeriodResponse, Trip } from "@/interfaces/schedule";
import useSWRInfinite from "swr/infinite";

export const useJourneysByPeriod = (params: JourneysByPeriodParams) => {
  const getKey = (
    pageIndex: number,
    previousPageData: JourneysByPeriodResponse,
  ) => {
    if (Object.keys(params).length === 0) return null;
    if (previousPageData && !previousPageData.hasNext) return null;
    return {
      url: "/journeys-by-period",
      args: { ...params, pageNumber: pageIndex + 1 },
    };
  };
  const { data, error, isLoading, mutate, size, setSize, isValidating } =
    useSWRInfinite<JourneysByPeriodResponse>(getKey, fetchJourneysByPeriod, {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      onSuccess: (data, key, config) => {
        console.log({ data, key, config });
      },
    });

  // const trips = data?.map((page) => page.trips).flat();
  const trips = data?.[0]?.trips;
  const drivers = data?.map((page) => page.drivers).flat();
  const hasNext = data?.[data.length - 1]?.hasNext;

  const updateTrip = (newTrip: Trip) => {
    const tripToUpdate = data?.find((page) =>
      page.trips.find((trip) => trip.id === newTrip.id),
    );
    if (!tripToUpdate) return;
    const updatedTrips = tripToUpdate.trips.map((trip) =>
      trip.id === newTrip.id ? newTrip : trip,
    );
    const updatedData = data?.map((page) =>
      page.trips.find((trip) => trip.id === newTrip.id)
        ? { ...page, trips: updatedTrips }
        : page,
    );
    mutate(updatedData, false);
  };

  return {
    trips: trips,
    drivers: drivers,
    hasNext,
    error,
    isLoading,
    mutate,
    isValidating,
    updateTrip,
    size,
    setSize,
  };
};
