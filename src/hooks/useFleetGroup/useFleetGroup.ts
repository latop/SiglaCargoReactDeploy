import { fetchFleetGroup, FetchFleetGroupParams } from "@/services/vehicles";
import { FleetGroup } from "@/interfaces/vehicle";
import useSWR from "swr";

export const useFleetGroup = (params: FetchFleetGroupParams) => {
  const { data, error, isLoading } = useSWR<FleetGroup[]>(
    { url: "/fleet-group", args: params },
    fetchFleetGroup,
  );

  return {
    fleetGroups: data,
    error,
    isLoading,
  };
};
