import { useFormContext } from "react-hook-form";

export function useJourneyFormFooter() {
  const { watch, setValue } = useFormContext();

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
    handleAddTravel,
    handleAddActivity,
  };
}
