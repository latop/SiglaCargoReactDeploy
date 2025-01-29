"use client";

import { useHash } from "@/hooks/useHash";
import { useForm } from "react-hook-form";

export const useTrucksDialog = () => {
  const [hash] = useHash();

  const methods = useForm();
  const isAdd = !!(hash as string)?.match(/#add-truck/);
  const truckId = (hash as string)?.match(/#truck-id-(.+)/)?.[1];

  const loadingTruck = !isAdd && truckId;

  const dialogTitle = isAdd ? "Adicionar Caminhão" : "Editar Caminhão";
  return {
    methods,
    loadingTruck,
    dialogTitle,
  };
};
