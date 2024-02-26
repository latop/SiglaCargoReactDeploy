import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchLocationGroupParams {
  pageSize?: number;
  code?: string;
}

export async function fetchLocationGroup({
  args: params,
}: {
  args: FetchLocationGroupParams;
}) {
  try {
    const locationGroupParams = {
      PageSize: params.pageSize,
      filter1String: params.code?.toUpperCase(),
    };
    const response = await axios.get("/LocationGroup", {
      params: locationGroupParams,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
