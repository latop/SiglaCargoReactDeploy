import {
  fetchGenerateScheduleCircuit,
  fetchOptmizedTrips,
} from "@/services/trips";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useToast } from "../useToast";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const useTripOptimization = () => {
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
    try {
      await axios.delete(`/Optimizer/removeotm?otmId=${otmId}`);
      addToast("Removido com sucesso!", { type: "success" });
      mutate();
    } catch (error) {
      addToast("Erro ao remover, tente novamente", { type: "success" });
      console.log(error);
    }
  };

  return {
    optmizedTrips,
    mutate,
    isLoading,
    handleOptmizeTrip,
    handleDeleteOptmitzationTrip,
  };
};
