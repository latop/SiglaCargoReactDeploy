import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";
import { FetchBasicParams } from "./types";
import { Truck } from "@/interfaces/vehicle";

export const useGetFleetGroupQuery = ({
  pageSize = 20,
  code,
}: FetchBasicParams) => {
  return useQuery({
    queryKey: ["fleet_group"],
    queryFn: async () => {
      try {
        const response = await api.get("/FleetGroup", {
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

export interface FetchTrucksFilterParams {
  filter1Id?: string;
  filter2Id?: string;
  filter3Id?: string;
  filter1String?: string;
  filter2String?: string;
  filter3String?: string;
  pageSize?: number;
  pageNumber?: number;
}

export interface FetchTrucksParams {
  pageSize?: number;
  fleetTypeId?: string;
  fleetGroupId?: string;
  locationGroupId?: string;
  licensePlate?: string;
  fleetCode?: string;
}

interface TruckPaginationResponse {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pageSize: number;
  totalPages: number;
  trucks: Truck[];
  totalCount: number;
}

export const useGetTrucksQuery = (params?: FetchTrucksParams) => {
  return useQuery({
    queryKey: ["trucks", params],
    queryFn: async () => {
      try {
        const response = await api.get("/Truck", {
          params: {
            PageSize: params?.pageSize || 20,
            filter1Id: params?.fleetTypeId,
            filter2Id: params?.fleetGroupId,
            filter3Id: params?.locationGroupId,
            filter1String: params?.licensePlate?.toUpperCase(),
            filter2String: params?.fleetCode,
          },
        });
        const pagination = response.headers["x-pagination"]
          ? JSON.parse(response.headers["x-pagination"])
          : {};

        const normalizeData: TruckPaginationResponse = {
          currentPage: pagination.CurrentPage || 1,
          hasNext: pagination.HasNext,
          hasPrevious: pagination.HasPrevious,
          pageSize: pagination.PageSize,
          totalPages: pagination.TotalPages,
          trucks: response.data,
          totalCount: pagination.TotalCount,
        };

        return normalizeData;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    staleTime: 86400,
    enabled: params && Object.values(params).some(Boolean),
  });
};
