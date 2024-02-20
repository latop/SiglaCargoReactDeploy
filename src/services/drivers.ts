import { Driver, Position } from "@/interfaces/driver";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchDriversParams {
  pageSize?: number;
  nickName?: string;
}

export interface FetchPositionParams {
  pageSize?: number;
  code?: string;
}

export async function fetchDrivers(
  params: FetchDriversParams,
): Promise<Driver[] | unknown> {
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

export async function fetchPositions(
  params: FetchPositionParams,
): Promise<Position[] | unknown> {
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
