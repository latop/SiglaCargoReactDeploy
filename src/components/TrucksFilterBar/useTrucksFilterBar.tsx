"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fleetTypeId: z.string().optional(),
  fleetGroupId: z.string().optional(),
  fleetGroupCode: z.string().optional(),
  locationGroupId: z.string().optional(),
  locationGroupCode: z.string().optional(),
  licensePlate: z.string().optional(),
  fleetCode: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

export const useTrucksFilterBar = () => {
  const router = useRouter();
  const params = useSearchParams();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fleetTypeId: params.get("fleetTypeId") || "",
      fleetGroupId: params.get("fleetGroupId") || "",
      fleetGroupCode: params.get("fleetGroupCode") || "",
      locationGroupId: params.get("locationGroupId") || "",
      locationGroupCode: params.get("locationGroupCode") || "",
      licensePlate: params.get("licensePlate") || "",
      fleetCode: params.get("fleetCode") || "",
    },
  });

  const onSubmit = (data: FormFields) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    router.push(`/trucks?${params.toString()}`);
  };

  const onClearParams = () => {
    methods.reset({});
    router.push("/trucks");
    setTimeout(() => window.location.reload(), 500);
  };

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    onClearParams,
  };
};
