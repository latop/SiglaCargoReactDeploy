"use client";

import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const truckSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  id: z.string().optional(),
  isRefurbished: z.boolean(),
  stateId: z.string().optional(),
  state: z.string().optional(),
  chassisNumber: z.string().optional(),
  licensePlate: z.string(),
  regulatoryNumber: z.string().optional(),
  regulatoryValidity: z.string().optional(),
  manufactureYear: z.string(),
  serialNumber: z.string(),
  tare: z.string(),
  fleetCode: z.string().optional(),
  capacity: z.string(),
  locationGroupId: z.string(),
  fleetTypeId: z.string(),
  integrationCode: z.string(),
  integrationCodeGPS: z.string(),
  note: z.string().optional(),
});

export type TruckFormType = z.infer<typeof truckSchema>;

export const useTrucksDialog = () => {
  const [hash, setHash] = useHash();
  const [handleFetch, { loading: loadingFetch }] = useFetch();
  const { addToast } = useToast();
  const methods = useForm<TruckFormType>({
    resolver: zodResolver(truckSchema),
  });
  const isAdd = !!(hash as string)?.match(/#add-truck/);
  const truckId = (hash as string)?.match(/#truck-id-(.+)/)?.[1];

  const loadingTruck = !isAdd && truckId && loadingFetch;

  const dialogTitle = isAdd ? "Adicionar Caminhão" : "Editar Caminhão";

  const handleErrors = useCallback(
    (data: TruckFormType) => {
      Object.keys(data).forEach((key) => {
        if (methods.formState.errors[key as keyof TruckFormType]) {
          methods.setError(key as keyof TruckFormType, {
            message: "*Obrigatório",
          });
        }
      });
    },
    [methods.formState.errors],
  );

  const handleSubmit = async (data: TruckFormType) => {
    console.log();
    const body: TruckFormType = {
      ...data,
      manufactureYear: dayjs(data.manufactureYear).format("YYYY"),
    };
    console.log(body);
    if (isAdd) {
      await handleFetch("/truck", body, {
        method: "post",
        onSuccess: () => {
          addToast("Caminhão adicionado com sucesso!", { type: "success" });
          setHash("");
          methods.reset({});
        },
        onError: (error) => addToast(error.message, { type: "error" }),
      });
    }
  };

  useEffect(() => {
    handleErrors(methods.getValues());
  }, [handleErrors, methods.formState.errors]);

  return {
    methods,
    loadingTruck,
    dialogTitle,
    onSubmit: methods.handleSubmit(handleSubmit),
  };
};
