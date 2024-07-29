import { ReportsResponse } from "@/interfaces/reports";
import { fetchReports } from "@/services/reports";
import { useForm } from "react-hook-form";
import useSWR, { SWRConfiguration } from "swr";

export const useReports = (options?: SWRConfiguration) => {
  const { data, error, isLoading, mutate } = useSWR<ReportsResponse[]>(
    "/reports",
    fetchReports,
    { ...options },
  );

  const methods = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    methods,
    onSubmit,
  };
};
