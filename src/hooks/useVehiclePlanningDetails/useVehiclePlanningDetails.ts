import useSWR, { SWRConfiguration } from "swr";
import { usePost } from "../usePost";
import { IVehiclePlanning } from "@/interfaces/vehicle";
import { fetchVehiclePlanningDetails } from "@/services/vehicles";

export interface DailyTripDetailsParams {
  id?: string;
}

export const useVehiclePlanningDetails = (
  params?: DailyTripDetailsParams,
  options?: SWRConfiguration,
) => {
  const [create] = usePost();
  const { data, error, isLoading } = useSWR<IVehiclePlanning>(
    params?.id ? { url: "/vehicle-planning-details", args: params } : null,
    fetchVehiclePlanningDetails,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    },
  );

  const updateVehiclePlanning = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: {
      onSuccess?: () => void;
      onError?: () => void;
    },
  ) => {
    return create("/TruckAssignmentPlan", body, {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    });
  };

  return {
    vehiclePlanningDetails: data,
    updateVehiclePlanning,
    error,
    isLoading,
  };
};
