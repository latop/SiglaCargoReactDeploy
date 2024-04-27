import { useState } from "react";
import { fetchDailyTripDetail } from "@/services/schedule";
import useSWR, { SWRConfiguration } from "swr";

export interface DailyTripDetailsParams {
  demand?: string;
  lineCode?: string;
  isReturn?: boolean;
}

export const useDailyTripDetail = (options?: SWRConfiguration) => {
  const [params, setParams] = useState<DailyTripDetailsParams>({});

  const { data, error, isLoading } = useSWR(
    params.demand || params.lineCode
      ? { url: "/daily-trip-detail", args: params }
      : null,
    fetchDailyTripDetail,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    },
  );

  const fetchDailyTrip = (params: DailyTripDetailsParams) => {
    if (params.demand || params.lineCode) {
      setParams(params);
    }
  };

  return [
    fetchDailyTrip,
    {
      dailyTripDetail: data,
      error,
      isLoading,
    },
  ] as const;
};
