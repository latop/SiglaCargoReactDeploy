import { useHash } from "@/hooks/useHash";
import { useReleaseDriver } from "@/hooks/useReleaseDriver/useReleaseDriver";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

export function useReleaseDriverDialog() {
  const [hash] = useHash();
  const match = (hash as string)?.match(/#releaseDriverId-(.+)/);
  const releaseDriverId = match?.[1];

  const { drivers, isLoading, error } = useReleaseDriver();

  const loading = isLoading && !error;
  const driverAndTruckToRelase = drivers.find(
    (driver) => driver.dailyTripSectionId === releaseDriverId,
  );

  const dateObject = (dateString: string) =>
    dayjs(dateString, "DD/MM/YYYY hh:mm");

  const methods = useForm({
    defaultValues: {
      saida: dateObject(driverAndTruckToRelase?.saida as string),
      entrega: dateObject(driverAndTruckToRelase?.entrega as string),
      demanda: driverAndTruckToRelase?.demanda,
      destino: driverAndTruckToRelase?.destino,
      motoristaLiberado: driverAndTruckToRelase?.motoristaLiberado,
      motoristaPlan: driverAndTruckToRelase?.motoristaPlan,
      veiculoLiberado: driverAndTruckToRelase?.veiculoLiberado,
      veiculoPlan: driverAndTruckToRelase?.veiculoPlan,
    },
  });
  return {
    releaseDriverId,
    methods,
    driverAndTruckToRelase,
    loading,
  };
}
