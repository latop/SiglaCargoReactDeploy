import { useHash } from "@/hooks/useHash";
import { fetchOptmizedTrip } from "@/services/trips";
import useSWR from "swr";

export const useTripOptimizationDialog = () => {
  const [hash] = useHash();
  const { data, isLoading } = useSWR(
    { url: "/trip-optimization", args: hash },
    fetchOptmizedTrip,
  );

  return {
    data,
    isLoading,
  };
};
