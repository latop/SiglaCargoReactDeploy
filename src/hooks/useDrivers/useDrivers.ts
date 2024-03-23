import { fetchDrivers, FetchDriversParams } from "@/services/drivers";
import { Driver } from "@/interfaces/driver";
import useSWR from "swr";

export const useDrivers = (params: FetchDriversParams) => {
  const { data, error, isLoading } = useSWR<Driver[]>(
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
