"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

type FormFields = {
  locationGroupId?: string;
  dtPublish?: Dayjs | null | undefined;
};

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  {
    message: "Data é obrigatório",
  },
);

const schema = z.object({
  dtPublish: dateOrDayjsSchema,
  locationGroupId: z.string().optional(),
});

export function usePublishJourneyFilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      dtPublish: params.get("dtPublish")
        ? dayjs(params.get("dtPublish")).format("YYYY-MM-DD")
        : dayjs(),
      locationGroupId: params.get("locationGroupId") || "",
    },
  });

  const onSubmit = (data: FormFields) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.append(key, String(value));
      }
    });

    router.push(`/publish-journey?${params.toString()}`);
  };

  return {
    methods,
    onSubmit,
  };
}
