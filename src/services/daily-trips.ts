import { DailyTripResponse } from "@/interfaces/daily-trip";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export type FetchDailyTripsParams = {
  startDate: string;
  endDate: string;
  fleetGroupCode?: string;
  locationDestId?: string;
  locationOrigId?: string;
  tripDate?: string;
  sto?: string;
  flgStatus?: string;
  pageSize?: number;
  pageNumber?: number;
};

export async function fetchDailyTrips({
  args,
}: {
  args: FetchDailyTripsParams;
}) {
  try {
    const params = {
      filter1Id: args.fleetGroupCode,
      filter2Id: args.locationDestId,
      filter3Id: args.locationDestId,
      filter1String: args.sto,
      filter2String: args.tripDate,
      filter3String: args.flgStatus,
      pageSize: args.pageSize,
      pageNumber: args.pageNumber,
    };

    const response = await axios.get(`/DailyTrip`, {
      params,
    });
    const normalizeData: DailyTripResponse = {
      currentPage: args.pageNumber || 1,
      hasNext: response.data.length === args.pageSize,
      dailyTrips: response.data,
    };
    return normalizeData;
  } catch (error) {
    console.error(error);
    return error;
  }
}
