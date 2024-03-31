import { useCircuit } from "@/hooks/useCircuit";
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

  const { data, isLoading } = useCircuit({
    ciruictCode: journeyDetailId,
  });

  return {
    data,
    isLoading,
    journeyDetailId,
    currentCircuit,
    methods,
  };
}
