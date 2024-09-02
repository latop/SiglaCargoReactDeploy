import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

// "truckId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// "dtRef": "2024-09-01T14:24:44.214Z",
// "driverId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// "startTime": "2024-09-01T14:24:44.214Z",
// "endTime": "2024-09-01T14:24:44.214Z"

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  {
    message: "Data é obrigatório",
  },
);
const NewTruckAssignmentSchema = z.object({
  truckId: z.string().min(1, { message: "Obrigatório*" }),
  driverId: z.string().min(1, { message: "Obrigatório*" }),
  dtRef: dateOrDayjsSchema,
  startTime: dateOrDayjsSchema,
  endTime: dateOrDayjsSchema,
});

type NewTruckAssignmentForm = z.infer<typeof NewTruckAssignmentSchema>;

export const useNewTruckAssigment = () => {
  const methods = useForm<NewTruckAssignmentForm>({
    resolver: zodResolver(NewTruckAssignmentSchema),
    defaultValues: {
      dtRef: dayjs(),
      startTime: dayjs(),
      endTime: dayjs().add(7, "days"),
      driverId: "",
      truckId: "",
    },
  });
  const { addToast } = useToast();
  const [postTruckAssignment, { loading: loadingPostTruckAssignment }] =
    useFetch();
  const [, setHash] = useHash();

  const onSubmit = async (data: FieldValues) => {
    const body = {
      ...data,
      startTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      endTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      dtRef: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    };
    await postTruckAssignment("/TruckAssignment", body, {
      onSuccess: () => {
        addToast("Atribuição executada com sucess!", { type: "success" });
        setHash("");
        methods.reset({});
      },
      onError: () => {
        addToast("Erro ao criar atribuição criada.", {
          type: "error",
        });
      },
    });
  };

  return {
    methods,
    onSubmit,
    handleSubmit: methods.handleSubmit(onSubmit),
    loadingPostTruckAssignment,
  };
};
