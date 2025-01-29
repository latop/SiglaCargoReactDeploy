"use client";

import { useHash } from "@/hooks/useHash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const truckSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  id: z.string(),
  isRefurbished: z.boolean(),
  stateId: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  chassisNumber: z.string().nullable().optional(),
  licensePlate: z.string(),
  regulatoryNumber: z.string().nullable().optional(),
  regulatoryValidity: z.string().nullable().optional(),
  manufactureYear: z.string(),
  serialNumber: z.string(),
  tare: z.string(),
  fleetCode: z.string(),
  capacity: z.string(),
  locationGroupId: z.string(),
  fleetTypeId: z.string(),
  fleetType: z.object({
    code: z.string(),
  }),
  integrationCodeGPS: z.string(),
  note: z.string().nullable().optional(),
});

export type TruckFormType = z.infer<typeof truckSchema>;

export const useTrucksDialog = () => {
  const [hash] = useHash();

  const methods = useForm<TruckFormType>({
    resolver: zodResolver(truckSchema),
  });
  const isAdd = !!(hash as string)?.match(/#add-truck/);
  const truckId = (hash as string)?.match(/#truck-id-(.+)/)?.[1];

  const loadingTruck = !isAdd && truckId;

  const dialogTitle = isAdd ? "Adicionar Caminhão" : "Editar Caminhão";

  const handleSubmit = (data: TruckFormType) => {
    Object.keys(data).forEach((key) => {
      if (methods.formState.errors[key as keyof TruckFormType]) {
        methods.setError(key as keyof TruckFormType, {
          type: "required",
          message: "*Obrigatório",
        });
      }
    });
    console.log(data);
  };

  return {
    methods,
    loadingTruck,
    dialogTitle,
    onSubmit: methods.handleSubmit(handleSubmit),
  };
};
