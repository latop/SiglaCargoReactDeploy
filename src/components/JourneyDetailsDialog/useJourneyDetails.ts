import { useDriverSchedule } from "@/templates/DriversSchedule/useDriversSchedule";
import dayjs from "dayjs";
import { useJourney } from "@/hooks/useJourney";
import { useForm } from "react-hook-form";

export function useJourneyDetails(journeyDetailId: string) {
  const methods = useForm();
  const { watch, setValue } = methods;
  const { trips } = useDriverSchedule();

  const currentTrip = trips?.find((trip) => trip.id === journeyDetailId);
  const { data, isLoading } = useJourney({
    driverId: currentTrip?.driverId,
    journeyDate: dayjs(currentTrip?.startPlanned).format("YYYY-MM-DD"),
  });

  const handleAddJourney = () => {
    const driverSchedules = watch("driverSchedules");
    driverSchedules.push({
      type: "",
      task: "",
      locCodeOrig: "",
      locCodeDest: "",
      lineCode: "",
      licensePlate: "",
      startPlanned: "",
      endPlanned: "",
      startActual: "",
      endActual: "",
      new: true,
    });
    setValue("driverSchedules", driverSchedules);
  };

  return {
    data,
    isLoading,
    journeyDetailId,
    currentTrip,
    methods,
    handleAddJourney,
  };
}
