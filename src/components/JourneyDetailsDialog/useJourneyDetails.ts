import { useCircuit } from "@/hooks/useCircuit";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useForm } from "react-hook-form";

export function useJourneyDetails(journeyDetailId: string) {
  const methods = useForm();
  const { watch, setValue } = methods;
  const { circuits } = useJourneysByPeriod();
  const currentCircuit = circuits?.find(
    (circuit) => circuit.ciruictCode === journeyDetailId,
  );

  const { data, isLoading } = useCircuit({
    ciruictCode: journeyDetailId,
  });

  const handleAddTravel = () => {
    const tasksDriver = watch("tasksDriver");
    tasksDriver.push({
      seq: tasksDriver.length + 1,
      type: "V",
      demand: "",
      locationOrigCode: "",
      locationDestCode: "",
      lineCode: "",
      startPlanned: "",
      endPlanned: "",
      startActual: "",
      endActual: "",
    });
    setValue("tasksDriver", tasksDriver);
  };

  const handleAddActivity = () => {
    const tasksDriver = watch("tasksDriver");
    tasksDriver.push({
      seq: tasksDriver.length + 1,
      type: "A",
      activityId: "",
      activityCode: "",
      startPlanned: "",
      endPlanned: "",
      startActual: "",
      endActual: "",
    });
    setValue("tasksDriver", tasksDriver);
  };

  return {
    data,
    isLoading,
    journeyDetailId,
    currentCircuit,
    methods,
    handleAddTravel,
    handleAddActivity,
  };
}
