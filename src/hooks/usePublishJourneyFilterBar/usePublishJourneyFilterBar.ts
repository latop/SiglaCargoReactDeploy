"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter, useSearchParams } from "next/navigation";
import "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

type FormFields = {
  locationGroupId?: string;
  dtPublish?: Dayjs | null | undefined;
};

const dateOrDayjsSchema = z
  .union([
    z.instanceof(Date),
    z.custom((val) => dayjs.isDayjs(val), { message: "Invalid date format" }),
  ])
  .or(z.string().optional());

const schema = z.object({
  dtPublish: dateOrDayjsSchema.optional(),
  locationGroupId: z.string().optional(),
});

export function usePublishJourneyFilterBar() {
  const router = useRouter();
  const params = useSearchParams();

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      dtPublish: params.get("dtPublish")
        ? dayjs(params.get("dtPublish"))
        : dayjs(),
      locationGroupId: params.get("locationGroupId") || "",
    },
  });

  const onSubmit = (data: FormFields) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.append(
          key,
          key === "dtPublish" && dayjs.isDayjs(value)
            ? value.format("YYYY-MM-DD")
            : String(value),
        );
      }
    });

    router.push(`/publish-journey?${params.toString()}`);
  };

  return {
    methods,
    onSubmit,
  };
}
