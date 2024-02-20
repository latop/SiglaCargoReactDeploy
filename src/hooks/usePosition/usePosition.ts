import { fetchPositions, FetchPositionParams } from "@/services/drivers";
import { Position } from "@/interfaces/driver";
import useSWR from "swr";

export const usePosition = (params: FetchPositionParams) => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  const { data, error, isLoading } = useSWR<Position[]>(
    `/position?${queryParams}`,
    () => fetchPositions(params) as Promise<Position[]>,
  );

  return {
    positions: data,
    error,
    isLoading,
  };
};
