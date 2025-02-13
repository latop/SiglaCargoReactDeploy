"use client";

import { useHash } from "@/hooks/useHash";
import { useGetLocationByIdQuery } from "@/services/query/trips";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  code: z.string().optional(),
  codeIntegration1: z.string().optional(), //gps
  codeIntegration2: z.string().optional(), // TMS
  name: z.string().optional(),
  cityId: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  loctionGroupId: z.string().optional(),
  locationGroup: z.string().optional(),
  locationTypeId: z.string().optional(),
  locationTypeCode: z.string().optional(),
  timezoneId: z.string().optional(),
});

export type LocationFormType = z.infer<typeof schema>;

export const useLocationsDialog = () => {
  const [hash] = useHash();

  const isToAddLocation = (hash as string)?.match(/#add-location/);
  const locationId = (hash as string)?.match(/#location-id-(.+)/)?.[1];
  const dialogTitle = isToAddLocation
    ? "Adicionar Localização"
    : "Editar Localização";

  const { data, isFetching: isLoadingLocation } =
    useGetLocationByIdQuery(locationId);
  const methods = useForm<LocationFormType>({
    resolver: zodResolver(schema),
    values: {
      locationTypeCode: data?.locationTypeCode,
    },
  });

  const handleFormDefaults = useCallback(() => {
    methods.reset(data);
    methods.setValue("locationTypeCode", data?.locationTypeCode);
  }, [data, methods]);

  useEffect(() => {
    handleFormDefaults();
  }, [handleFormDefaults]);

  return {
    methods,
    onSubmit: methods.handleSubmit((data) => {
      console.log(data);
    }),
    dialogTitle,
    isLoadingLocation,
    locationId,
  };
};
