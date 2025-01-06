import axios from "axios";
import api from "../configs/api";
import { useQuery } from "@tanstack/react-query";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export type FetchDailyTripsParams = {
  startDate: string;
  endDate: string;
  fleetGroupId?: string;
  locationDestId?: string;
  locationOrigId?: string;
  tripDate?: string;
  sto?: string;
  flgStatus?: string;
  pageSize?: number;
  pageNumber?: number;
};

export const initialDataDailyTripsParams = {
  startDate: "",
  endDate: "",
  fleetGroupId: "",
  locationDestId: "",
  locationOrigId: "",
  tripDate: "",
  sto: "",
  flgStatus: "N",
  pageSize: 15,
  pageNumber: 1,
};

export const useGetDailyTripsQuery = ({
  fleetGroupId,
  locationOrigId,
  locationDestId,
  sto,
  tripDate,
  flgStatus,
  pageNumber,
  pageSize = 15,
}: FetchDailyTripsParams) => {
  const params = {
    filter1Id: fleetGroupId || undefined,
    filter2Id: locationOrigId || undefined,
    filter3Id: locationDestId || undefined,
    filter1String: sto || undefined,
    filter2String: tripDate?.toString(),
    filter3String: flgStatus,
    pageSize,
    pageNumber,
  };
  console.log("params", params);
  const runQuery = !tripDate;

  return useQuery({
    queryKey: ["daily-trips", { params }],
    queryFn: async () => {
      try {
        const response = await api.get("/DailyTrip", {
          params,
        });
        console.log("response", response);
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    enabled: !runQuery,
  });
};

export interface FetchDailyTripDetailsParams {
  dailyTripId?: string;
  lineId: string;
  startTime: string;
}

export const useGetDailyTripDetailQuery = {
  queryKey: ["daily-trips"],
  queryFn: async (params: FetchDailyTripsParams) => {
    try {
      const response = await api.get("/DailyTrip/getdailytripdetail", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
