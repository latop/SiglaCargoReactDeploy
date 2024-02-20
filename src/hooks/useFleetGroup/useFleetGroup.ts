import { fetchFleetGroup, FetchFleetGroupParams } from "@/services/vehicles";
import { FleetGroup } from "@/interfaces/vehicle";
import useSWR from "swr";

export const useFleetGroup = (params: FetchFleetGroupParams) => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  const { data, error, isLoading } = useSWR<FleetGroup[]>(
    `/fleet-group?${queryParams}`,
    () => fetchFleetGroup(params) as Promise<FleetGroup[]>,
  );

  return {
    fleetGroups: data,
    error,
    isLoading,
  };
};
