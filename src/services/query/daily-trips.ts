import axios from "axios";
import api from "../configs/api";

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

export const useGetDailyTripsQuery = {
  queryKey: ["daily-trips"],
  queryFn: async ({
    fleetGroupId,
    locationOrigId,
    locationDestId,
    sto,
    tripDate,
    flgStatus,
    pageNumber,
    pageSize = 20,
  }: FetchDailyTripsParams) => {
    try {
      const response = await api.get("/DailyTrip", {
        params: {
          filter1Id: fleetGroupId,
          filter2Id: locationOrigId,
          filter3Id: locationDestId,
          filter1String: sto,
          filter2String: tripDate,
          filter3String: flgStatus,
          pageSize,
          pageNumber,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
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
