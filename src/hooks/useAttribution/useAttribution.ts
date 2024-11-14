import useSWR, { SWRConfiguration } from "swr";
import {
  FetchAttribuitionParams,
  fetchAttribuitions,
} from "@/services/drivers";

export const useAttribution = (
  params?: FetchAttribuitionParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR(
    { url: "/attribution", args: params },
    fetchAttribuitions,
    options,
  );

  return {
    attribution: data as unknown,
    error,
    isLoading,
  };
};
