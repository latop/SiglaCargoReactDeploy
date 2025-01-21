"use client";

import { useGetPublishJourneyQuery } from "@/services/query/schedule";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

export const usePublishJourney = () => {
  const params = useSearchParams();
  const publishJourney = useGetPublishJourneyQuery({
    dtPublish: params.get("dtPublish")
      ? dayjs(params.get("dtPublish")).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    LocationGroupId: params.get("locationGroupId") || "",
  });

  return {
    ...publishJourney,
  };
};
