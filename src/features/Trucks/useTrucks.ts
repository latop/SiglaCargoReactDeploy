import { useGetTrucksQuery } from "@/services/query/vehicles";

export const useTrucks = () => {
  const { data } = useGetTrucksQuery();

  return {
    data,
  };
};
