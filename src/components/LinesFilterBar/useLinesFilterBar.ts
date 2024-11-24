import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

interface FormFields {
  fleetGroupCode: string;
  locationDestId: string;
  fleetGroupId: string;
  locationOrigId: string;
  code: string;
}

const schema = z.object({
  fleetGroupCode: z.string().optional(),
  fleetGroupId: z.string().optional(),
  locationOrigId: z.string().optional(),
  locationDestId: z.string().optional(),
  code: z.string().optional(),
});

export function useLinesFilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fleetGroupCode: params.get("fleetGroupCode") || "",
      fleetGroupId: params.get("fleetGroupId") || "",
      locationDestId: params.get("locationDestId") || "",
      locationOrigId: params.get("locationOrigId") || "",
      code: params.get("code")?.toLocaleUpperCase() || "",
    },
  });

  const onSubmit = (data: FormFields) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
        if (key === "code") params.append(key, value.toLocaleUpperCase());
      }
    });
    router.push(`/lines?${params.toString()}`);
  };

  return {
    methods,
    onSubmit,
  };
}
