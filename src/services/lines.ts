import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
export type FetchLinesParams = {
  startDate: string;
  endDate: string;
  fleetGroupId?: string;
  locationDestId?: string;
  locationOrigId?: string;
  code?: string;
  pageSize?: number;
  pageNumber?: number;
};

export async function fetchLines({ args }: { args: FetchLinesParams }) {
  console.log(args);

  const params = {
    filter1Id: args.locationOrigId,
    filter2Id: args.locationDestId,
    filter3Id: args.fleetGroupId,
    filter1String: args.code,
    PageSize: args.pageSize,
    PageNumber: args.pageNumber,
  };

  try {
    const response = await axios.get("/Line", {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
