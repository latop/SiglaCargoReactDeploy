import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";
import { FetchBasicParams } from "./types";

const resource = "Location";

export const useGetLocationGroupQuery = {
  queryKey: ["location_group"],
  queryFn: async ({ pageSize = 15, code }: FetchBasicParams) => {
    try {
      const response = await api.get(`${resource}Group`, {
        params: {
          PageSize: pageSize,
          filter1String: code?.toUpperCase(),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export const useGetLocationQuery = ({
  pageSize = 15,
  code,
}: FetchBasicParams) => {
  return useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      try {
        const response = await api.get(`${resource}`, {
          params: {
            PageSize: pageSize,
            filter1String: code?.toUpperCase(),
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  });
};

export const useGetLocationReleaseQuery = {
  queryKey: ["location_release"],
  queryFn: async ({ pageSize = 15, code }: FetchBasicParams) => {
    try {
      const response = await api.get(`${resource}/GetLocationRelease`, {
        params: {
          PageSize: pageSize,
          filter1String: code?.toUpperCase(),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

// TODO: Implement the fetchLocations function to the right place
export const useGetTripTypesQuery = ({
  pageSize = 15,
  code,
}: FetchBasicParams) => {
  return useQuery({
    queryKey: ["trip_types"],
    queryFn: async () => {
      try {
        const response = await api.get("TripType", {
          params: {
            PageSize: pageSize,
            filter1String: code?.toUpperCase(),
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  });
};

export const useGetOptmizedTripsQuery = {
  queryKey: ["optmized_trips"],
  queryFn: async () => {
    try {
      const response = await api.get("/Optimizer/getallotm");
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export interface GenerateScheduleCircuitParams {
  start: string;
  end: string;
  locationGroupCode: string;
}
export const useGetGenerateScheduleCircuitParamsQuery = {
  queryKey: ["generate_schedule_circuit_params"],
  queryFn: async ({
    start,
    end,
    locationGroupCode,
  }: GenerateScheduleCircuitParams) => {
    try {
      const response = await api.get("/Optimizer/GenerateScheduleCircuit", {
        params: {
          start,
          end,
          locationGroupCode,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export interface OptmizedTrip {
  otmId: string;
}

export const useGetOptmizedTripQuery = {
  queryKey: ["optmized_trip"],
  queryFn: async ({ otmId }: OptmizedTrip) => {
    try {
      const response = await api.get("/Optimizer/getotm", {
        params: {
          otmId,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

interface FetchLines {
  fleetGroupId?: string;
  locationDestId?: string;
  locationOrigId?: string;
  code?: string;
  pageSize?: number;
  pageNumber?: number;
}

export const useGetLinesQuery = {
  queryKey: ["lines"],
  queryFn: async ({
    fleetGroupId,
    locationDestId,
    locationOrigId,
    code,
    pageSize,
    pageNumber,
  }: FetchLines) => {
    try {
      const response = await api.get("/Line", {
        params: {
          filter1Id: locationOrigId,
          filter2Id: locationDestId,
          filter3Id: fleetGroupId,
          filter1String: code,
          PageSize: pageSize,
          PageNumber: pageNumber,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
