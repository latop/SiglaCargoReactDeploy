import { DriversPaginated } from "@/interfaces/driver";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchDriversParams {
  pageSize?: number;
  nickName?: string;
  integrationCode?: string;
}

export interface FetchPositionParams {
  pageSize?: number;
  code?: string;
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
      filter2String: params.integrationCode?.toUpperCase(),
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
  args: params,
}: {
  args: FetchDriversParams;
}): Promise<DriversPaginated> {
  try {
    const driversParams = {
      PageSize: params.pageSize,
      filter1String: params.nickName?.toUpperCase(),
      filter2String: params.integrationCode?.toUpperCase(),
    };
    const response = await axios.get("/Drivers", { params: driversParams });

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

export async function fetchPositions({
  args: params,
}: {
  args: FetchPositionParams;
}) {
  try {
    const positionParams = {
      PageSize: params.pageSize,
      filter1String: params.code?.toUpperCase(),
    };
    const response = await axios.get("/Position", { params: positionParams });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
