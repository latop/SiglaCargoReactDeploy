import useSWR from "swr";
import { fetchImportTrips } from "@/services/import-trips";
import { useSearchParams } from "next/navigation";

export const useImportTrips = () => {
  const searchParams = useSearchParams();
  const params = {
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  };

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    {
      url: "/import-trips",
      args: params,
    },
    fetchImportTrips,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
