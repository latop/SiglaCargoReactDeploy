import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchFleetGroupParams {
  pageSize?: number;
  code?: string;
}

export async function fetchFleetGroup({
  args: params,
}: {
  args: FetchFleetGroupParams;
}) {
  try {
    const fleetGroupParams = {
      PageSize: params.pageSize,
      filter1String: params.code?.toUpperCase(),
    };
    const response = await axios.get("/FleetGroup", {
      params: fleetGroupParams,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
