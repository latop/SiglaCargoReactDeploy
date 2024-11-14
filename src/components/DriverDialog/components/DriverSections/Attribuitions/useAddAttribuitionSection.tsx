import { useFormContext } from "react-hook-form";

export function useAddAttribuitionSection() {
  const { watch, setValue } = useFormContext();
  const handleAddStep = () => {
    const driverAttributions = watch("driverAttributions");

    driverAttributions.push({
      section: driverAttributions.length + 1,
      driverId: "00000000-0000-0000-0000-000000000000",
      attributionId: null,
      startDate: null,
      endDate: null,
    });
    setValue("driverAttributions", driverAttributions);
  };

  return {
    handleAddStep,
  };
}
