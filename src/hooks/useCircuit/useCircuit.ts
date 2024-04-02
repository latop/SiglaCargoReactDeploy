import useSWRImmutable from "swr/immutable";
import { useHash } from "@/hooks/useHash";
import { fetchCircuit } from "@/services/schedule";
import { CircuitJourney } from "@/interfaces/schedule";
import { Driver } from "@/interfaces/driver";

interface useCircuitParams {
  ciruictCode?: string;
}

export const useCircuit = () => {
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
    const changeData = (prevData: CircuitJourney) => {
      const newData = {
        driverId: driver.driverId,
        nickName: driver.nickName,
        driverBase: driver.driverBase,
        driverSubBase: driver.driverSubBase,
      };
      console.log(newData, "newData");
      return {
        ...prevData,
        ...newData,
      };
    };

    mutate(changeData, false);
  };

  return {
    circuit: data,
    error,
    isLoading,
    changeDriver,
  };
};
