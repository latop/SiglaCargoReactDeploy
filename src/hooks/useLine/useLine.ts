import useSWR, { SWRConfiguration } from "swr";
import { FetchLineParams, fetchLines } from "@/services/trips";
import { useFetch } from "../useFetch";
import { useToast } from "../useToast";

export const useLine = (
  params?: FetchLineParams,
  options?: SWRConfiguration,
) => {
  const [deleteLine] = useFetch();
  const { addToast } = useToast();
  const { data, error, isLoading } = useSWR(
    { url: "/line", args: params },
    fetchLines,
    options,
  );

  const handleDeleteLine = (id: string, refreshLines?: () => void) => {
    return deleteLine(`/deleteline/${id}`, id, {
      method: "delete",
      onSuccess: () => {
        addToast("Rota deletada com sucesso!", { type: "success" });
        refreshLines?.();
      },
      onError: () => addToast("Erro ao deletar a rota.", { type: "error" }),
    });
  };

  return {
    lines: data as unknown,
    error,
    isLoading,
    handleDeleteLine,
  };
};
