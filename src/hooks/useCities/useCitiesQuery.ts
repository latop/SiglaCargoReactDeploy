import { City } from "@/interfaces/parameters";
import { fetchCities, FetchCitiesParams } from "@/services/parameters";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useCitiesQuery = (
  params: FetchCitiesParams,
  options?: UseQueryOptions<City[], Error>,
) => {
  return useQuery<City[], Error>({
    queryKey: ["cities", params],
    queryFn: async () => {
      const response = await fetchCities({ args: params });
      return response.data;
    },
    staleTime: 0,
    ...options,
  });
};
