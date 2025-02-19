import { fetchLocationGroup, FetchLocationGroupParams } from "@/services/trips";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useLocationGroupQuery = (
  params: FetchLocationGroupParams,
  options?: UseQueryOptions,
) => {
  return useQuery({
    queryKey: ["location-group", params],
    queryFn: async () => await fetchLocationGroup({ args: params }),
    ...options,
  });
};
