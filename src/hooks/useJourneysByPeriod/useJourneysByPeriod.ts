import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { fetchJourneysByPeriod } from "@/services/schedule";
import { Circuit, JourneysByPeriodResponse, Trip } from "@/interfaces/schedule";
import useSWRInfinite from "swr/infinite";

export const useJourneysByPeriod = () => {
  const params = useSearchParams();
  const searchParams = {
    startDate: params.get("startDate")
      ? dayjs(params.get("startDate")).format("YYYY-MM-DD")
      : null,
    endDate: params.get("endDate")
      ? dayjs(params.get("endDate")).format("YYYY-MM-DD")
      : null,
    nickName: params.get("nickName"),
    fleetGroupCode: params.get("fleetGroupCode"),
    locationGroupCode: params.get("locationGroupCode"),
    positionCode: params.get("positionCode"),
    demand: params.get("demand"),
  };

  const getKey = (
    pageIndex: number,
    previousPageData: JourneysByPeriodResponse,
  ) => {
    if (!Object.values(searchParams).some(Boolean)) return null;
    if (previousPageData && !previousPageData.hasNext) return null;
    return {
      url: "/journeys-by-period",
      args: { ...searchParams, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };
  const { data, error, isLoading, mutate, size, setSize, isValidating } =
    useSWRInfinite<JourneysByPeriodResponse>(getKey, fetchJourneysByPeriod, {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    });

  const trips = data?.map((page) => page.trips).flat() || [];
  const drivers = data?.map((page) => page.drivers).flat();
  const circuits = data?.map((page) => page.circuits).flat();
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

  const addNewData = ({
    trips: newTrips,
    circuits: newCircuits,
  }: {
    trips?: Trip[];
    circuits?: Circuit[];
  }) => {
    const newCurrentTrips = newTrips || [];
    const newCurrentCircuits = newCircuits || [];
    const updatedData = data?.map((page) => ({
      ...page,
      trips: [...newCurrentTrips, ...page.trips],
      circuits: [...newCurrentCircuits, ...page.circuits],
    }));
    mutate(updatedData, false);
  };

  const selectDriver = (driverId: string) => {
    const updatedData = data?.map((page) => ({
      ...page,
      drivers: page.drivers.map((driver) => ({
        ...driver,
        selected: driver.driverId === driverId,
      })),
    }));
    mutate(updatedData, false);
  };

  const refetch = () => {
    if (isValidating || isLoading) return;
    mutate(undefined, true);
  };

  const addActivity = (activity: Trip) => {
    const updatedData = data?.map((page) => ({
      ...page,
      trips: [activity, ...page.trips],
    }));
    mutate(updatedData);
  };

  return {
    trips,
    drivers: drivers,
    addActivity,
    hasNext,
    error,
    circuits,
    isLoading,
    mutate,
    refetch,
    isValidating,
    updateTrip,
    addNewData,
    selectDriver,
    size,
    setSize,
  };
};
