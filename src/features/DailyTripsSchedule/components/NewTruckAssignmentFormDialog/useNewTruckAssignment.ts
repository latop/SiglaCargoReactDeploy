import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  { message: "Data é obrigatório" },
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

  const handleSubmit = () => {
    methods.handleSubmit(onSubmit);
    methods.reset();
  };

  return {
    methods,
    onSubmit,
    handleSubmit,
    loadingPostTruckAssignment,
  };
};
