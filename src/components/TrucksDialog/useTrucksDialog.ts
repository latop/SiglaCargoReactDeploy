"use client";

import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { useGetTruckQuery } from "@/services/query/vehicles";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dateOrDayjsSchema = z.union([
  z.instanceof(Date),
  z.custom((val) => dayjs.isDayjs(val), { message: "Invalid date format" }),
]);

export const truckSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  id: z.string().optional(),
  isRefurbished: z.boolean(),
  stateId: z.string(),
  chassisNumber: z.string().optional(),
  licensePlate: z.string(),
  regulatoryNumber: z.string().optional(),
  regulatoryValidity: z.string().optional(),
  manufactureYear: dateOrDayjsSchema,
  serialNumber: z.string(),
  tare: z.number(),
  fleetCode: z.string().optional(),
  capacity: z.coerce.number(),
  locationGroupId: z.string(),
  fleetTypeId: z.string(),
  integrationCode: z.string(),
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

  const {
    data,
    isSuccess,
    isLoading: isLoadingTruck,
  } = useGetTruckQuery(truckId);

  const handleSubmit = async (data: TruckFormType) => {
    const body: TruckFormType = {
      ...data,
      manufactureYear: dayjs(`${data.manufactureYear}-01-01`).format("YYYY"),
      stateId: data.stateId,
    };

    if (isAdd) {
      return await handleFetch("/truck", body, {
        method: "post",
        onSuccess: () => {
          addToast("Caminhão adicionado com sucesso!", { type: "success" });
          setHash("");
          methods.reset({});
        },
        onError: (error) => addToast(error.message, { type: "error" }),
      });
    }

    return await handleFetch(`/Truck`, body, {
      method: "put",
      onSuccess: () => {
        addToast("Caminhão atualizado com sucesso!", { type: "success" });
        setHash("");
      },
      onError: (error) => addToast(error.message, { type: "error" }),
    });
  };

  useEffect(() => {
    handleErrors(methods.getValues());
  }, [handleErrors, methods.formState.errors]);

  useLayoutEffect(() => {
    if (isSuccess && !isLoadingTruck) {
      methods.reset({
        ...data,
        manufactureYear: dayjs(`${data.manufactureYear}-01-01`).toDate(),
      });
    }
  }, [data, isSuccess, methods, isLoadingTruck]);

  return {
    methods,
    loadingTruck,
    dialogTitle,
    truckId,
    isLoadingTruck: true,
    onSubmit: methods.handleSubmit(handleSubmit),
  };
};
