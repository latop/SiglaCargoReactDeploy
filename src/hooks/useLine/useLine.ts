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
  const getKey = (params: FetchLineParams) => {
    if (!params) return null;

    return { url: "/line", args: params };
  };

  const { data, error, isLoading } = useSWR(getKey, fetchLines, options);

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
