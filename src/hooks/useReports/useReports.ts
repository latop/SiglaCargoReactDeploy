import { ReportsResponse } from "@/interfaces/reports";
import { fetchReports } from "@/services/reports";
import useSWR, { SWRConfiguration } from "swr";

export const useReports = (options?: SWRConfiguration) => {
  const { data, error, isLoading, mutate } = useSWR<ReportsResponse[]>(
    "/reports",
    fetchReports,
    { ...options },
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
