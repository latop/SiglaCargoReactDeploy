import { fetchDriversPaginated, FetchDriversParams } from "@/services/drivers";
import useSWRImmutable from "swr/immutable";
import { SWRConfiguration } from "swr";
import { DriversPaginated } from "@/interfaces/driver";

export const useDriversPaginated = (
  params?: FetchDriversParams,
  options?: SWRConfiguration,
) => {
  const getKey = (pageIndex: number, previousPageData: DriversPaginated) => {
    if (previousPageData && !previousPageData.hasNext) return null;

    return {
      url: "/drivers",
      args: { ...params, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };

  const { data, error, isLoading } = useSWRImmutable<DriversPaginated>(
    getKey,
    fetchDriversPaginated,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      ...options,
    },
  );
  console.log(data?.drivers);

  return {
    drivers: data?.drivers,
    error,
    isLoading,
  };
};
