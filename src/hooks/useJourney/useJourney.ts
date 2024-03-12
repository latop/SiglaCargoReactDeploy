import useSWR, { SWRConfiguration } from "swr";
import { fetchJourney } from "@/services/schedule";
import { Journey } from "@/interfaces/schedule";

interface UseJourneyParams {
  driverId?: string;
  journeyDate?: string;
}
export const useJourney = (
  params: UseJourneyParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<Journey>(
    { url: "/journey", args: params },
    fetchJourney,
    options,
  );
  return {
    data,
    error,
    isLoading,
  };
};
