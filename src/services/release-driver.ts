import axios from "axios";
import { Dayjs } from "dayjs";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface ReleaseDriverTypeParams {
  dtRef: Dayjs | null;
  locOrig: string;
  demand?: string;
  nickName?: string;
  licensePlate?: string;
  fleetCode?: string;
}
export async function fetchReleaseDriver({
  args: params,
}: {
  args: ReleaseDriverTypeParams;
}) {
  try {
    const response = await axios.get("/Journey/ReleaseDriver", { params });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
