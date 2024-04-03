import useSWRImmutable from "swr/immutable";
import { fetchAcitivities } from "@/services/parameters";
import { Activity } from "@/interfaces/parameters";

export const useActivities = () => {
  const { data, error, isLoading } = useSWRImmutable<Activity[]>(
    "/activities",
    fetchAcitivities,
  );

  return {
    activities: data,
    error,
    isLoading,
  };
};
