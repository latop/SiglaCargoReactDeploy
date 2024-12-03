import { State } from "@/interfaces/parameters";
import { FetchCompanyParams, fetchStates } from "@/services/parameters";
import useSWR, { SWRConfiguration } from "swr";

export const useStates = (
  params?: FetchCompanyParams,
  options?: SWRConfiguration,
) => {
  const { data, error, isLoading } = useSWR<State[]>(
    { url: "/states", args: params },
    fetchStates,
    options,
  );

  return {
    states: data,
    error,
    isLoading,
  };
};
