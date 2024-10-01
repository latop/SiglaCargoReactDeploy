import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";

export function useAddLineDialog() {
  const methods = useForm({
    defaultValues: {
      id: "00000000-0000-0000-0000-000000000000",
      code: "",
      description: "",
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
      freqMon: false,
      freqTue: false,
      freqWed: false,
      freqThu: false,
      freqFri: false,
      freqSat: false,
      freqSun: false,
      overtimeAllowed: 0,
      locationOrigId: "",
      locationDestId: "",
      cost: 0,
      fleetGroupId: "",
      tripTypeId: "",
      tripType: "",
    },
  });

  const handleSubmit = (data: FieldValues) => {
    const lineDefaultValues = {
      ...methods.getValues(),
      ...data,
      tripTypeId: data.tripType.id,
      locationOrigId: data.locationOrig.id,
      locationDestId: data.locationDest.id,
    };
    console.log(lineDefaultValues);
  };

  return { methods, handleSubmit };
}
