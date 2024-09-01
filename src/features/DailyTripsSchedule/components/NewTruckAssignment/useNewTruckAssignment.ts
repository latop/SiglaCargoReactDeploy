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
  // truckId: z.string(),
  dtRef: dateOrDayjsSchema,
  // driverId: z.string(),
  // startTime: dateOrDayjsSchema,
  // endTime: dateOrDayjsSchema,
});

type NewTruckAssignmentForm = z.infer<typeof NewTruckAssignmentSchema>;

export const useNewTruckAssigment = () => {
  const methods = useForm<NewTruckAssignmentForm>({
    resolver: zodResolver(NewTruckAssignmentSchema),
    defaultValues: {
      dtRef: dayjs(),
    },
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  console.log(methods.formState.errors);
  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
  };
};
