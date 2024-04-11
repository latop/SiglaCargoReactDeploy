import useSWRImmutable from "swr/immutable";
import { useHash } from "@/hooks/useHash";
import { fetchCircuit } from "@/services/schedule";
import { CircuitJourney } from "@/interfaces/schedule";
import { Driver } from "@/interfaces/driver";
import { usePost } from "@/hooks/usePost";
import { AxiosResponse, AxiosError } from "axios";

interface useCircuitParams {
  ciruictCode?: string;
}
export const useCircuit = () => {
  const [postCircuit, { loading }] = usePost();
  const [hash] = useHash();
  const match = (hash as string)?.match(/#journeyDetails-(.+)/);
  const journeyDetailId = match?.[1];

  const params: useCircuitParams = {
    ciruictCode: journeyDetailId,
  };

  const { data, error, isLoading, mutate } = useSWRImmutable<CircuitJourney>(
    params.ciruictCode ? { url: "/journey", args: params } : null,
    fetchCircuit,
  );

  const changeDriver = (driver: Driver) => {
    const changeData = (prevData?: CircuitJourney) => {
      if (!prevData) {
        return undefined;
      }

      const newData = {
        driverId: driver.id,
        nickName: driver.nickName,
        driverBase: driver.driverBase,
        driverSubBase: driver.driverSubBase,
      };

      return {
        ...prevData,
        ...newData,
      };
    };

    mutate(changeData, false);
  };

  interface CreateCircuitParams {
    onSuccess?: (data: AxiosResponse) => void;
    onError?: (message: AxiosError) => void;
  }

  const createCircuit = async (
    data: CircuitJourney,
    { onSuccess, onError }: CreateCircuitParams,
  ) => {
    postCircuit("/gantt/UpdateCircuit", data, {
      onSuccess: (data: AxiosResponse) => {
        onSuccess?.(data);
      },
      onError: (err) => {
        onError?.(err);
      },
    });
  };

  return {
    circuit: data,
    error,
    isLoading,
    isLoadingCreate: loading,
    changeDriver,
    createCircuit,
  };
};
