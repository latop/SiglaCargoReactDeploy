import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";
import { FetchBasicParams } from "./types";

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
  });
};
