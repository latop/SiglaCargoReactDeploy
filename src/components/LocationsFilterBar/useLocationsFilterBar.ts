import { useLocations } from "@/features/Locations/useLocations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";

const schema = z.object({
  locationTypeId: z.string().optional(),
  locationTypeCode: z.string().optional(),
  locationCode: z.string().optional(),
  integrationCode: z.string().optional(),
  integrationCode2: z.string().optional(),
});

export type FormFields = z.infer<typeof schema>;

export const useLocationsFilterBar = () => {
  const router = useRouter();
  const params = useSearchParams();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      locationTypeId: params.get("locationTypeId") || "",
      locationTypeCode: params.get("locationTypeCode") || "",
      locationCode: params.get("locationCode") || "",
      integrationCode: params.get("integrationCode") || "",
      integrationCode2: params.get("integrationCode2") || "",
    },
  });

  const { refetchLocations } = useLocations();

  const onSubmit = (data: FormFields) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (!value) {
        refetchLocations();
        return;
      }
      if (value) {
        params.append(key, value);
      }
    });
    router.push(`/locations?${params.toString()}`);
  };

  const onClearParams = () => {
    methods.reset({});
    router.push("/locations");
    setTimeout(() => window.location.reload(), 500);
  };

  return {
    methods,
    onClearParams,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
