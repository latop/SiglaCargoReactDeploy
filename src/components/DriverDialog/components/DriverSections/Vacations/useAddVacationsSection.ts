import { useDriverDialog } from "@/components/DriverDialog/useDriverDialog";
import { useFormContext } from "react-hook-form";

export function useAddVacationSection() {
  const { watch, setValue } = useFormContext();
  const { driverId } = useDriverDialog();
  const driverVacations = watch("driverVacations") ?? [];
  const handleAddStep = () => {
    driverVacations.push({
      driverId: driverId ? driverId : null,
      id: "00000000-0000-0000-0000-000000000000",
      startDate: null,
      endDate: null,
    });
    setValue("driverVacations", driverVacations);
  };

  return {
    handleAddStep,
  };
}
