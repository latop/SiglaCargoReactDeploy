import { fetchJourneysByPeriod } from "@/services/schedule";
import { JourneysByPeriodResponse } from "@/interfaces/schedule";
import useSWR, { Fetcher } from "swr";

type Params = {
  startDate?: string;
  endDate?: string;
  nickName?: string;
  gpId?: string;
  locationGroupId?: string;
  demand?: string;
};

export const useJourneysByPeriod = (params: Params) => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  const { data, error, isLoading } = useSWR<JourneysByPeriodResponse>(
    queryParams.size ? `/Schedule/GetJourneysByPeriod?${queryParams}` : null,
    fetchJourneysByPeriod as Fetcher<JourneysByPeriodResponse>,
  );

  return {
    data,
    error,
    isLoading,
  };
};
