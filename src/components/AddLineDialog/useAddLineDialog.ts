import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/useToast";
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
      tripType: "",
      lineSections: [],
    },
  });
  const { addToast } = useToast();
  const [lineCreate, { loading }] = useFetch();

  const handleSubmit = async (data: FieldValues) => {
    const body = {
      line: {
        ...data,
        tripTypeId: data.tripType.id,
        locationOrigId: data.locationOrig.id,
        locationDestId: data.locationDest.id,
      },
    };

    return await lineCreate("/updateline", body, {
      onSuccess: () =>
        addToast("Rota criada com sucesso!", { type: "success" }),

      onError: (error) => addToast(error.message, { type: "error" }),
    });
  };

  return { methods, handleSubmit, loading };
}
