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
  staleTime: 86400,
};

export const useGetLocationQuery = ({
  pageSize = 15,
  code,
}: FetchBasicParams) => {
  return useQuery({
    queryKey: ["location", code],
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
    staleTime: 86400,
  });
};

export const useGetLocationReleaseQuery = ({
  pageSize = 15,
  code,
}: FetchBasicParams) => {
  return useQuery({
    queryKey: ["location_release"],
    queryFn: async () => {
      try {
        const response = await api.get(`${resource}`, {
          params: {
            PageSize: pageSize,
            filter1String: code?.toUpperCase(),
            filter1Bool: true,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    staleTime: 86400,
  });
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
    staleTime: 86400,
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

export const useGetLinesQuery = ({
  fleetGroupId,
  locationDestId,
  locationOrigId,
  code,
  pageSize,
  pageNumber,
}: FetchLines) => {
  return useQuery({
    queryKey: ["lines"],
    queryFn: async () => {
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
        const { data } = response.data;
        const parsedData = data.map((item: { line: unknown }) => item.line);
        response.data.data = parsedData;
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  });
};

interface FetchStopTypeParams {
  pageSize?: number;
  stopType: string;
}

export const useGetStopTypeQuery = ({
  pageSize = 20,
  stopType,
}: FetchStopTypeParams) => {
  return useQuery({
    queryKey: ["lines"],
    queryFn: async () => {
      try {
        const response = await api.get("/StopType", {
          params: {
            PageSize: pageSize,
            filter1String: stopType?.toUpperCase(),
          },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    staleTime: 86400,
  });
};
