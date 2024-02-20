import { fetchLocationGroup, FetchLocationGroupParams } from "@/services/trips";
import useSWR from "swr";
import { LocationGroup } from "@/interfaces/trip";

export const useLocationGroup = (params: FetchLocationGroupParams) => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  const { data, error, isLoading } = useSWR<LocationGroup[]>(
    `/location-group?${queryParams}`,
    () => fetchLocationGroup(params) as Promise<LocationGroup[]>,
  );

  return {
    locationGroups: data,
    error,
    isLoading,
  };
};
