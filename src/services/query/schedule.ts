import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";

type GetPublishJourneyParams = {
  dtPublish?: Date;
  LocationGroupId?: string;
};

export const useGetPublishJourneyQuery = ({
  dtPublish,
  LocationGroupId,
}: GetPublishJourneyParams) => {
  return useQuery({
    queryKey: ["publish_journey", dtPublish, LocationGroupId],
    queryFn: async () => {
      try {
        const response = await api.get("/Journey/PublishJourney", {
          params: {
            dtPublish,
            LocationGroupId,
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
