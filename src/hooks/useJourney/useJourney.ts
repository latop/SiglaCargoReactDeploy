import useSWR from "swr";
import { fetchJourney } from "@/services/schedule";
import { Journey } from "@/interfaces/schedule";

interface UseJourneyParams {
  driverId?: string;
  journeyDate?: string;
}
export const useJourney = (params: UseJourneyParams) => {
  const { data, error, isLoading } = useSWR<Journey>(
    { url: "/journey", args: params },
    fetchJourney,
  );
  return {
    data,
    error,
    isLoading,
  };
};
