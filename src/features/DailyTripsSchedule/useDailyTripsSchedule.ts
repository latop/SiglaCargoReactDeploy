import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface TripsGanttSearchParams {
  startDate?: string;
  endDate?: string;
  fleetGroupCode?: string;
}

export function useDailyTripsSchedule() {
  const params = useSearchParams();
  const searchParams: Partial<TripsGanttSearchParams> = useMemo(() => {
    const tempSearchParams: Partial<TripsGanttSearchParams> = {};
    const paramKeys: (keyof TripsGanttSearchParams)[] = [
      "startDate",
      "endDate",
      "fleetGroupCode",
    ];

    paramKeys.forEach((key) => {
      const value = params.get(key);
      if (value !== null) {
        tempSearchParams[key] = value;
      }
    });

    return tempSearchParams;
  }, [params]);

  const hasRelevantParams = Object.keys(searchParams).length > 0;

  return {
    showContent: hasRelevantParams,
  };
}
