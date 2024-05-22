import { Scenario, ScenarioCapacity } from "@/interfaces/planning";
import { fetchScenarioDetails } from "@/services/planning";
import useSWR, { SWRConfiguration } from "swr";

export interface ScenarioDetailsParams {
  id?: string;
}

export const useScenarioDetails = (
  params: ScenarioDetailsParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<Scenario>(
    params.id ? { url: "/scenario-details", args: params } : null,
    fetchScenarioDetails,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    },
  );

  return {
    scenarioDetails: data,
    scenarioCapacities: [] as ScenarioCapacity[],
    error,
    isLoading,
  };
};
