import { useMutation } from "@tanstack/react-query";
import api from "../configs/api";
import { queryClient } from "../configs/provider";
import dayjs from "dayjs";
import { DailyTrip } from "@/interfaces/daily-trip";

export const useDailyTripMutation = () => {
  return useMutation({
    mutationKey: ["daily-trips"],
    mutationFn: async (payload: DailyTrip) => {
      console.log(payload);
      const normalizedPayload = {
        tripNumber: payload.tripNumber,
        tripDate: payload.tripDate
          ? dayjs(payload.tripDate).format("YYYY-MM-DD")
          : "",
        fleetGroupId: payload.fleetGroupId,
        fleetGroup: payload.fleetGroup,
        flgStatus: payload.flgStatus,
        notes: payload.notes,
        lineId: payload.lineId,
        line: payload.line,
        dt: payload.dt,
        sto: payload.sto,
        locationOrigId: payload.locationOrigId,
        locationOrig: payload.locationOrig,
        locationDestId: payload.locationDestId,
        locationDest: payload.locationDest,
        startPlanned: payload.startPlanned
          ? dayjs(payload.startPlanned).format("YYYY-MM-DDTHH:mm")
          : null,
        endPlanned: payload.endPlanned
          ? dayjs(payload.endPlanned).format("YYYY-MM-DDTHH:mm")
          : null,
        tripTypeId: payload.tripTypeId,
        tripType: payload.tripType,
        stopTypeId: payload.stopTypeId,
        stopType: payload.stopType,
        companyId: payload.companyId,
        id: payload.id,
        dailyTripSections: payload.dailyTripSections.map((section) => ({
          ...section,
          startPlanned: section.startPlanned
            ? dayjs(section.startPlanned).format("YYYY-MM-DDTHH:mm")
            : null,
          endPlanned: section.endPlanned
            ? dayjs(section.endPlanned).format("YYYY-MM-DDTHH:mm")
            : null,
          startEstimated: section.startEstimated
            ? dayjs(section.startEstimated).format("YYYY-MM-DDTHH:mm")
            : null,
          endEstimated: section.endEstimated
            ? dayjs(section.endEstimated).format("YYYY-MM-DDTHH:mm")
            : null,
        })),
      };

      console.log(normalizedPayload);
      try {
        const response = await api.post("/DailyTrip/updatedailyTrip", {
          dailyTrip: normalizedPayload,
        });
        console.log("response", response);
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["daily-trips"],
      });
    },
  });
};
