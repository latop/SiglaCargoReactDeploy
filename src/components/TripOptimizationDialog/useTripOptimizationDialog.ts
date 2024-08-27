import { useHash } from "@/hooks/useHash";
import { fetchOptmizedTrip } from "@/services/trips";
import useSWR from "swr";

export const useTripOptimizationDialog = () => {
  const [hash] = useHash();
  const { data, isLoading } = useSWR({ args: hash }, fetchOptmizedTrip, {
    revalidateOnMount: true,
    revalidateIfStale: false,
  });

  return {
    data,
    isLoading,
  };
};
