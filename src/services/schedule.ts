import { JourneysByPeriodResponse } from "@/interfaces/schedule";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchJourneysByPeriod(
  url: string,
): Promise<JourneysByPeriodResponse | unknown> {
  try {
    const response = await axios.get(url);
    const data: JourneysByPeriodResponse = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error as JourneysByPeriodResponse;
  }
}
