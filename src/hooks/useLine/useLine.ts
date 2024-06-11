import useSWR, { SWRConfiguration } from "swr";
import { Line } from "@/interfaces/daily-trip";
import { FetchLineParams, fetchLines } from "@/services/trips";

export const useLine = (
  params?: FetchLineParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<Line[]>(
    { url: "/line", args: params },
    fetchLines,
    options,
  );

  return {
    lines: data,
    error,
    isLoading,
  };
};
