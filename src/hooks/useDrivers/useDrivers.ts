import { fetchDrivers, FetchDriversParams } from "@/services/drivers";
import { Driver } from "@/interfaces/driver";
import useSWRImmutable from "swr/immutable";

export const useDrivers = (params?: FetchDriversParams) => {
  const { data, error, isLoading } = useSWRImmutable<Driver[]>(
    { url: "/drivers", args: params },
    fetchDrivers,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );

  return {
    drivers: data,
    error,
    isLoading,
  };
};
