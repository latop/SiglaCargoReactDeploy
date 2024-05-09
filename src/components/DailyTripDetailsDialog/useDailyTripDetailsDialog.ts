import { useEffect } from "react";
import { useDailyTripDetails } from "@/hooks/useDailyTripDetails/useDailyTripDetails";
import { useHash } from "@/hooks/useHash";
import { DailyTrip } from "@/interfaces/daily-trip";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

export function useDailyTripDetailsDialog() {
  const methods = useForm();
  const { reset } = methods;
  const [hash] = useHash();
  const match = (hash as string)?.match(/#dailyTrip-(.+)/);
  const dailyTripId = match?.[1];
  const { dailyTripDetails, isLoading, error } = useDailyTripDetails({
    id: dailyTripId,
  });

  const normalizeData = (data: DailyTrip) => {
    const dailyTripDefaultValues = {
      tripNumber: data.tripNumber,
      tripDate: data.tripDate ? dayjs(data.tripDate).format("YYYY-MM-DD") : "",
      fleetGroupId: data.fleetGroupId,
      fleetGroup: data.fleetGroup,
      flgStatus: data.flgStatus,
      notes: data.notes,
      lineId: data.lineId,
      line: data.line,
      dt: data.dt,
      sto: data.sto,
      locationOrigId: data.locationOrigId,
      locationOrig: data.locationOrig,
      locationDestId: data.locationDestId,
      locationDest: data.locationDest,
      startPlanned: data.startPlanned
        ? dayjs(data.startPlanned).format("YYYY-MM-DDTHH:mm")
        : null,
      endPlanned: data.endPlanned
        ? dayjs(data.endPlanned).format("YYYY-MM-DDTHH:mm")
        : null,
      tripTypeId: data.tripTypeId,
      tripType: data.tripType,
      stopTypeId: data.stopTypeId,
      stopType: data.stopType,
      companyId: data.companyId,
      id: data.id,
    };
    return dailyTripDefaultValues;
  };

  useEffect(() => {
    if (dailyTripDetails) {
      reset(normalizeData(dailyTripDetails));
    }
  }, [dailyTripDetails]);

  return {
    dailyTripDetails,
    isLoading,
    error,
    methods,
  };
}
