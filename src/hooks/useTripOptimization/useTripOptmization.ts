import {
  fetchGenerateScheduleCircuit,
  fetchOptmizedTrips,
} from "@/services/trips";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useFetch } from "../useFetch";
import { useToast } from "../useToast";

export const useTripOptimization = () => {
  const [deleteOptmizationTrip] = useFetch();
  const { addToast } = useToast();

  const {
    data: optmizedTrips,
    mutate,
    isLoading,
  } = useSWR({ url: "/trip-optimization" }, fetchOptmizedTrips);

  const searchParams = useSearchParams();

  const handleOptmizeTrip = async () => {
    const params = {
      start: searchParams.get("start") || "",
      end: searchParams.get("end") || "",
      locationGroupCode: searchParams.get("locationGroupCode") || "",
    };
    await fetchGenerateScheduleCircuit({ args: params });
  };

  const handleDeleteOptmitzationTrip = async (otmId: string) => {
    await deleteOptmizationTrip(
      "/Optimizer/removeotm",
      { otmId },
      {
        method: "delete",
        onSuccess: () => {
          addToast("Removido com sucesso!", { type: "success" });
          mutate();
        },
        onError: () => {
          addToast("Erro ao remover, tente novamente", { type: "success" });
          mutate();
        },
      },
    );
  };

  return {
    optmizedTrips,
    mutate,
    isLoading,
    handleOptmizeTrip,
    handleDeleteOptmitzationTrip,
  };
};
