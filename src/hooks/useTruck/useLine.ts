import useSWR, { SWRConfiguration } from "swr";
import { FetchLineParams } from "@/services/trips";
import { fetchTruck } from "@/services/vehicles";
import { Truck } from "@/interfaces/vehicle";

export const useTruck = (
  params?: FetchLineParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<Truck[]>(
    { url: "/truck", args: params },
    fetchTruck,
    options,
  );

  return {
    trucks: data,
    error,
    isLoading,
  };
};
