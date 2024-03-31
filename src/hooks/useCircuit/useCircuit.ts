import useSWR, { SWRConfiguration } from "swr";
import { fetchCircuit } from "@/services/schedule";
import { CircuitJourney } from "@/interfaces/schedule";

interface useCircuitParams {
  ciruictCode?: string;
}
export const useCircuit = (
  params: useCircuitParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<CircuitJourney>(
    params.ciruictCode ? { url: "/journey", args: params } : null,
    fetchCircuit,
    options,
  );
  return {
    data,
    error,
    isLoading,
  };
};
