import { DriversPaginated } from "@/interfaces/driver";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchDriversParams {
  pageSize?: number;
  pageNumber?: number;
  nickName?: string;
  integrationCode?: string;
  admission?: string;
}
export async function fetchDriverById({ id }: { id: string }) {
  try {
    const response = await axios.get(`/Drivers/${id}`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchDrivers({
  args: params,
}: {
  args: FetchDriversParams;
}) {
  try {
    const driversParams = {
      PageSize: params.pageSize,
      filter1String: params.nickName?.toUpperCase(),
    };
    const response = await axios.get("/Drivers", { params: driversParams });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function fetchDriversPaginated({
  args,
}: {
  args: FetchDriversParams;
}): Promise<DriversPaginated> {
  try {
    const params = {
      PageSize: args.pageSize,
      PageNumber: args.pageNumber,
      filter1String: args.nickName?.toUpperCase(),
      filter2String: args.integrationCode?.toUpperCase(),
      filter4String: args.admission,
    };

    const response = await axios.get("/Drivers", { params });

    const pagination = response.headers["x-pagination"]
      ? JSON.parse(response.headers["x-pagination"])
      : {};

    const normalizeData: DriversPaginated = {
      currentPage: pagination.CurrentPage || 1,
      hasNext: pagination.HasNext,
      hasPrevious: pagination.HasPrevious,
      pageSize: pagination.PageSize,
      totalPages: pagination.TotalPages,
      drivers: response.data,
      totalCount: pagination.TotalCount,
    };
    return normalizeData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
