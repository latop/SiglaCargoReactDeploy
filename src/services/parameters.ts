import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchActivitiesParams {
  pageSize?: number;
  code?: string;
}

export async function fetchAcitivities({
  args: params,
}: {
  args: FetchActivitiesParams;
}) {
  try {
    const activitiesParams = {
      PageSize: params.pageSize,
      filter1String: params.code?.toUpperCase(),
    };

    const response = await axios.get("/Activity", { params: activitiesParams });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
