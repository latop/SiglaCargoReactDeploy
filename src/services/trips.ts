/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface FetchLocationParams {
  pageSize?: number;
  code?: string;
}

export async function fetchLocations({
  args: params,
}: {
  args: FetchLocationParams;
}) {
  try {
    const locationParams = {
      PageSize: params.pageSize,
      filter1String: params.code?.toUpperCase(),
    };
    const response = await axios.get("/Location", {
      params: locationParams,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export interface FetchLineParams {
  pageSize?: number;
  code?: string;
}

export async function fetchLines({ args }: { args: FetchLineParams }) {
  try {
    const params = {
      PageSize: args.pageSize,
      filter1String: args.code?.toUpperCase(),
    };

    const response = await axios.get("/Line", { params });
    const data = response.data;
    return data.map((line: any) => line.line);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export interface FetchTripTypeParams {
  pageSize?: number;
  code?: string;
}

export async function fetchTripTypes({ args }: { args: FetchTripTypeParams }) {
  try {
    const params = {
      PageSize: args.pageSize,
      filter1String: args.code?.toUpperCase(),
    };

    const response = await axios.get("/TripType", { params });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function fetchOptmizedTrips() {
  try {
    const response = await axios.get("/Optimizer/getallotm");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

interface FetchGenerateScheduleCircuitParams {
  start: string;
  end: string;
  locationGroupCode: string;
}
export async function fetchGenerateScheduleCircuit({
  args,
}: {
  args: FetchGenerateScheduleCircuitParams;
}) {
  const params = {
    start: args.start,
    end: args.end,
    locationGroupCode: args.locationGroupCode,
  };
  try {
    const response = await axios.get("/Optimizer/GenerateScheduleCircuit", {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function fetchOptmizedTrip({ otmId }: { otmId: string }) {
  const params = { otmId };
  console.log(params);
  try {
    const response = await axios.get("/Optimizer/getotm", {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
