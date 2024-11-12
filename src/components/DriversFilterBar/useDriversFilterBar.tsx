import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { FetchDriversParams } from "@/services/drivers";

type FormFields = {
  nickName?: string;
  integrationCode?: string;
  admission: Dayjs | null;
};

const schema = z.object({
  nickName: z.string().optional(),
  integrationCode: z.string().optional(),
  admission: z.coerce.string().optional(),
});

export function useDriversFilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const defaultValues: FetchDriversParams = {
    admission: params.get("admission")
      ? dayjs(params.get("admission")).format("YYYY-MM-DD")
      : "",
    integrationCode: params.get("integrationCode") || "",
    nickName: params.get("nickName") || "",
  };

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FieldValues) => {
    const body = {
      ...data,
      admission: dayjs(data.admission).format("YYYY-MM-DD"),
    };
    console.log(body);
    const params = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => {
      if (dayjs.isDayjs(value)) {
        params.append(key, value.format("YYYY-MM-DD"));
      } else if (value) {
        params.append(key, value);
      }
    });
    router.push(`/drivers?${params.toString()}`);
  };

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
}
