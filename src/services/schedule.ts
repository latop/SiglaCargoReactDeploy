import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export type JourneysByPeriodParams = {
  startDate: string;
  endDate: string;
  nickName?: string;
  gpId?: string;
  locationGroupId?: string;
  demand?: string;
  pageSize?: number;
  pageNumber?: number;
};

export async function fetchJourneysByPeriod({
  args: params,
}: {
  args: JourneysByPeriodParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetJourneysByPeriod`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchJourneyParams = {
  driverId: string;
  journeyDate: string;
};

export async function fetchJourney({
  args: { driverId, journeyDate },
}: {
  args: FetchJourneyParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetJourney`, {
      params: { driverId, journeyDate },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchDailyTripsUnallocatedParams = {
  startDate: string;
  endDate: string;
  pageSize: number;
  pageNumber: number;
};

export async function fetchDailyTripsUnallocated({
  args: params,
}: {
  args: FetchDailyTripsUnallocatedParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetDailyTripUnallocated`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchDeparturesArrivalsParams = {
  locationCode: string;
};

export async function fetchDeparturesArrivals({
  args: params,
}: {
  args: FetchDeparturesArrivalsParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetArrivalDeparture`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
