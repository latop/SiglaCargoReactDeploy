import api from "../configs/api";
import { FetchBasicParams } from "./types";

export const useGetFleetGroupQuery = {
  queryKey: ["location"],
  queryFn: async ({ pageSize = 20, code }: FetchBasicParams) => {
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
};
