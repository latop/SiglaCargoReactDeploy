import { FetchLocationsParams } from "@/interfaces/trip";
import { useGetLocationsQuery } from "@/services/query/trips";
import { useSearchParams } from "next/navigation";

export const useLocations = () => {
  const params = useSearchParams();
  const parameters: Partial<FetchLocationsParams> = {
    codeIntegration2: params.get("integrationCode2") || "",
    codeIntegration1: params.get("integrationCode") || "",
    locationTypeId: params.get("locationTypeId") || "",
    code: params.get("locationTypeCode") || "",
  };

  const payload = () => {
    Object.entries(parameters).forEach(([key, value]) => {
      if (!value) {
        delete parameters[key as keyof FetchLocationsParams];
      }
    });
    return parameters;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    isFetchingNextPage,
    // hasPreviousPage,
    isLoading,
    refetch: refetchLocations,
    isError,
  } = useGetLocationsQuery(payload());

  const locations = data?.pages.flatMap((page) => page.data) || [];
  const currentPage = data?.pages[data.pages.length - 1]?.currentPage || 1;

  const loadMoreLines = () => {
    if (!hasNextPage && isFetchingNextPage) return;
    fetchNextPage();
  };

  return {
    locations,
    currentPage,
    isEmpty: locations.length === 0,
    hasData: locations.length > 0,
    loadMoreLines,
    totalCount: data?.pages[0]?.totalCount || 0,
    isLoading: isLoading,
    isError,
    refetchLocations,
  };
};
