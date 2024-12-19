import useSWR, { SWRConfiguration } from "swr";
import { FetchLineParams, fetchLines } from "@/services/trips";

export const useLine = (
  params?: FetchLineParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR(
    { url: "/line", args: params },
    fetchLines,
    options,
  );

  return {
    lines: data as unknown,
    error,
    isLoading,
  };
};
