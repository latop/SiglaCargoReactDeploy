import useSWR from "swr";
import { fetchReport } from "@/services/report.service";
import { ReportResponse } from "@/interfaces/report.interface";

export const useReports = () => {
  const { data, error, isLoading } = useSWR<ReportResponse[]>(
    "getReports",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchReport,
  );

  return {
    data,
    error,
    isLoading,
  };
};
