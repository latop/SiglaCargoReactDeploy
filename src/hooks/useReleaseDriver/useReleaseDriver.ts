import { fetchReleaseDriver } from "@/services/release-driver";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import useSWR, { SWRConfiguration } from "swr";

export const useReleaseDriver = (options?: SWRConfiguration) => {
  const params = useSearchParams();
  const searchParams = {
    dtRef: params.get("startDate")
      ? dayjs(params.get("startDate")).format("YYYY-MM-DD")
      : null,
    nickName: params.get("nickName"),
    fleetCode: params.get("fleetCode"),
    demand: params.get("demand"),
    locOrig: params.get("locOrig"),
  };

  const { data, error, isLoading } = useSWR(
    { url: "/release-driver", args: searchParams },
    fetchReleaseDriver,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      ...options,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};
