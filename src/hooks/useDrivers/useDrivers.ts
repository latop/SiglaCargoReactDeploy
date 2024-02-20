import { fetchDrivers, FetchDriversParams } from "@/services/drivers";
import { Driver } from "@/interfaces/driver";
import useSWR from "swr";

export const useDrivers = (params: FetchDriversParams) => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  const { data, error, isLoading } = useSWR<Driver[]>(
    `/drivers?${queryParams}`,
    () => fetchDrivers(params) as Promise<Driver[]>,
  );

  return {
    drivers: data,
    error,
    isLoading,
  };
};
