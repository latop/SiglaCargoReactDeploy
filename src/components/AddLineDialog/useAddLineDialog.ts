import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";

export function useAddLineDialog() {
  const methods = useForm({
    defaultValues: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      code: "",
      description: "",
      startDate: dayjs(),
      endDate: dayjs().add(7, "day"),
      freqMon: 0,
      freqTue: 0,
      freqWed: 0,
      freqThu: 0,
      freqFri: 0,
      freqSat: 0,
      freqSun: 0,
      overtimeAllowed: 0,
      locationOrigId: "",
      locationDestId: "",
      cost: 0,
      fleetGroupId: "",
      tripTypeId: "",
    },
  });

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
    alert("Ainda falta integrar a API, testando dados por enquanto");
  };

  return { methods, handleSubmit };
}
