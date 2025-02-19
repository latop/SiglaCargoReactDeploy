import { fetchStates, FetchStatesParams } from "@/services/parameters";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useStatesQuery = (
  params: FetchStatesParams,
  options?: UseQueryOptions,
) => {
  return useQuery({
    queryKey: ["states", params],
    queryFn: async () => await fetchStates({ args: params }),
    ...options,
  });
};
