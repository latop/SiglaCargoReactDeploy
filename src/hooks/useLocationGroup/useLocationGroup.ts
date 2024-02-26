import { fetchLocationGroup, FetchLocationGroupParams } from "@/services/trips";
import useSWR from "swr";
import { LocationGroup } from "@/interfaces/trip";

export const useLocationGroup = (params: FetchLocationGroupParams) => {
  const { data, error, isLoading } = useSWR<LocationGroup[]>(
    { url: "/location-group", args: params },
    fetchLocationGroup,
  );

  return {
    locationGroups: data,
    error,
    isLoading,
  };
};
