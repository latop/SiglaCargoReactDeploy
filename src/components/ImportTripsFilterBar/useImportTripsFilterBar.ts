import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "dayjs/locale/pt-br";
import { z } from "zod";

dayjs.extend(customParseFormat);

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  {
    message: "Data é obrigatório",
  },
);

const schema = z.object({
  startDate: dateOrDayjsSchema,
  endDate: dateOrDayjsSchema,
  locationCodeId: z.string().optional(),
  locationCode: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

export function useImportTripsFilterBar() {
  const params = useSearchParams();
  const router = useRouter();

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: params.get("startDate")
        ? dayjs(params.get("startDate"))
        : dayjs(),

      endDate: params.get("endDate")
        ? dayjs(params.get("endDate"))
        : dayjs().add(1, "day"),
      locationCode: params.get("locationCode") || "",
      locationCodeId: params.get("locationCodeId") || "",
    },
  });

  const onSubmit = (data: FormFields) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (dayjs.isDayjs(value)) {
        params.append(key, value.format("YYYY-MM-DD"));
      } else if (!!value && typeof value === "string") {
        params.append(key, value);
      }
    });
    router.push(`/import-trips?${params.toString()}`);
  };

  const onClearParams = () => {
    methods.reset({
      locationCodeId: "",
      locationCode: "",
    });
    router.push("/import-trips");
    setTimeout(() => window.location.reload(), 500);
  };

  return {
    methods,
    onSubmit,
    onClearParams,
  };
}
