import { FetchOptmizedTripsData } from "@/interfaces/trip";
import {
  fetchGenerateScheduleCircuit,
  fetchOptmizedTrips,
} from "@/services/trips";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useTripOptmization = () => {
  const {
    data: optmizedTrips,
    mutate,
    isLoading,
  } = useSWR<FetchOptmizedTripsData[]>(
    { url: "/trip-optimization" },
    fetchOptmizedTrips,
  );

  const searchParams = useSearchParams();

  const handleOptmize = async () => {
    const params = {
      start: searchParams.get("start") || "",
      end: searchParams.get("end") || "",
      locationGroupCode: searchParams.get("locationGroupCode") || "",
    };
    await fetchGenerateScheduleCircuit({ args: params });
  };

  return {
    optmizedTrips,
    mutate,
    isLoading,
    handleOptmize,
  };
};
