"use client";

import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { Locations } from "@/interfaces/trip";
import {
  useCreateLocationMution,
  useEditLocationMution,
} from "@/services/mutation/trips";
import { useGetLocationByIdQuery } from "@/services/query/trips";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  code: z.string(),
  codeIntegration1: z.string().optional(), //gps
  codeIntegration2: z.string().optional(), // TMS
  name: z.string(),
  cityId: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  loctionGroupId: z.string().optional(),
  locationTypeId: z.string(),
  locationTypeCode: z.string().optional(),
  timezoneId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type LocationFormType = z.infer<typeof schema>;

export const useLocationsDialog = () => {
  const [hash, setHash] = useHash();
  const { addToast } = useToast();

  const isToAddLocation = (hash as string)?.match(/#add-location/);
  const locationId = (hash as string)?.match(/#location-id-(.+)/)?.[1];
  const dialogTitle = isToAddLocation
    ? "Adicionar Localização"
    : "Editar Localização";

  const { data: location, isFetching: isLoadingLocation } =
    useGetLocationByIdQuery(locationId);
  const methods = useForm<LocationFormType>({
    resolver: zodResolver(schema),
  });
  const { mutateAsync: createLocation } = useCreateLocationMution();
  const { mutateAsync: editLocation } = useEditLocationMution();

  const handleFormDefaults = useCallback(() => {
    methods.reset({
      ...location,
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().add(20, "year").format("YYYY-MM-DD"),
    });
  }, [location, methods]);

  useEffect(() => {
    handleFormDefaults();
  }, [handleFormDefaults]);

  const handleSubmit = async (data: LocationFormType) => {
    if (isToAddLocation && !locationId) {
      return await createLocation(data, {
        onSuccess: () => {
          addToast("Localizada cadastrada com sucesso!", { type: "success" });
          setHash("");
          methods.reset({});
        },
      });
    }
    const body: Locations = {
      ...location,
      locationGroupId: data.loctionGroupId,
    };

    return await editLocation(body, {
      onSuccess: () => {
        addToast("Localizada alterada com sucesso!", { type: "success" });
        setHash("");
        methods.reset({});
      },
    });
  };

  const handleErrors = useCallback(
    (data: LocationFormType) => {
      Object.keys(data).forEach((key) => {
        if (methods.formState.errors[key as keyof LocationFormType]) {
          methods.setError(key as keyof LocationFormType, {
            message: "*Obrigatório",
          });
        }
      });
    },
    [methods.formState.errors],
  );

  useEffect(() => {
    handleErrors(methods.getValues());
  }, [handleErrors, methods.formState.errors]);

  console.log(methods.formState.errors);
  return {
    methods,
    onSubmit: methods.handleSubmit(handleSubmit),
    dialogTitle,
    isLoadingLocation,
    locationId,
  };
};
