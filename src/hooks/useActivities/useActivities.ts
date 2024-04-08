import useSWRImmutable from "swr/immutable";
import { FetchActivitiesParams, fetchAcitivities } from "@/services/parameters";
import { Activity } from "@/interfaces/parameters";

export const useActivities = (params?: FetchActivitiesParams) => {
  const { data, error, isLoading } = useSWRImmutable<Activity[]>(
    { url: "/activities", args: params },
    fetchAcitivities,
  );

  return {
    activities: data,
    error,
    isLoading,
  };
};
