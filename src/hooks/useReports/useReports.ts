import { ReportsResponse } from "@/interfaces/reports";
import { fetchReports } from "@/services/reports";
import { FieldValues, useForm } from "react-hook-form";
import useSWR, { SWRConfiguration } from "swr";
import { useFetch } from "../useFetch";
import { useToast } from "../useToast";

export const useReports = (options?: SWRConfiguration) => {
  const { data, error, isLoading, mutate } = useSWR<ReportsResponse[]>(
    "/reports",
    fetchReports,
    { ...options },
  );
  const { addToast } = useToast();
  const [postReports] = useFetch();
  const methods = useForm();
  const onSubmit = async (data: FieldValues) => {
    const parameter = Object.entries(data)
      .map(([key, value]) => {
        if (key.includes("reportCode")) return;
        return value;
      })
      .filter((value) => value != undefined || value != null || value == "");
    const body = {
      reportCode: data.reportCode,
      parameter,
    };
    await postReports("/api/Report/Report", body, {
      onSuccess: () => {
        addToast("Relatório criado com sucesso", { type: "success" });
      },
      onError: () => {
        addToast("Erro ao criar relatório", { type: "error" });
      },
    });
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
