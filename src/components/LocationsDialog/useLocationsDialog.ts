"use client";

import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import {
  useCreateLocationMution,
  useEditLocationMution,
} from "@/services/mutation/trips";
import { useGetLocationByIdQuery } from "@/services/query/trips";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  code: z.string(),
  codeIntegration1: z.string().optional(), //gps
  codeIntegration2: z.string().optional(), // TMS
  name: z.string(),
  cityId: z.string().optional(),
  city: z.record(z.any()).optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  locationGroup: z.record(z.any()).optional(),
  loctionGroupId: z.string().optional(),
  locationTypeId: z.string(),
  locationType: z.record(z.any()).optional(),
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
      cityId: location?.city?.id,
      timezoneId: location?.timezone?.id,
      ...location,
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
    const body = {
      ...location,
      locationGroupId: data.loctionGroupId,
      locationTypeId: data.locationTypeId,
      name: data.name,
      code: data.code,
      codeIntegration1: data.codeIntegration1,
      codeIntegration2: data.codeIntegration2,
      latitude: data.latitude,
      longitude: data.longitude,
      cityId: data?.city?.id,
      timezoneId: data?.timezoneId,
      startDate: data.startDate,
      endDate: data.endDate,
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

  return {
    methods,
    onSubmit: methods.handleSubmit(handleSubmit),
    dialogTitle,
    isLoadingLocation,
    locationId,
  };
};
