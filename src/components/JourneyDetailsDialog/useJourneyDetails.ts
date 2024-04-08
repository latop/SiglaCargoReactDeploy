import { useCircuit } from "@/hooks/useCircuit";
import { useDrivers } from "@/hooks/useDrivers";
import { useHash } from "@/hooks/useHash";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useForm } from "react-hook-form";

export function useJourneyDetails() {
  const [hash] = useHash();
  const match = (hash as string)?.match(/#journeyDetails-(.+)/);
  const journeyDetailId = match?.[1];
  const methods = useForm();
  const { circuits } = useJourneysByPeriod();
  const currentCircuit = circuits?.find(
    (circuit) => circuit.ciruictCode === journeyDetailId,
  );

  const { circuit, isLoading } = useCircuit();
  const { isLoading: loadingDrivers } = useDrivers({
    nickName: circuit?.nickName,
  });

  return {
    data: circuit,
    isLoading: isLoading || loadingDrivers,
    journeyDetailId,
    currentCircuit,
    methods,
  };
}
