import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export type JourneysByPeriodParams = {
  startDate?: string;
  endDate?: string;
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
    const response = await axios.get(`/Schedule/GetJourneysByPeriod`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
