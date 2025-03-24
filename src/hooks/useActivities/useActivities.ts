import useSWR, { SWRConfiguration } from "swr";
import {
  FetchActivitiesParams,
  fetchActivityType,
} from "@/services/parameters";
import { ActivityType, PaginatedResponse } from "@/interfaces/parameters";

export const useActivities = (
  params?: FetchActivitiesParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<PaginatedResponse<ActivityType>>(
    {
      url: "/activityTypes",
      args: params,
    },
    fetchActivityType,
    options,
  );

  const activityTypes = data?.data || [];

  return {
    activityTypes,
    error,
    isLoading,
  };
};
