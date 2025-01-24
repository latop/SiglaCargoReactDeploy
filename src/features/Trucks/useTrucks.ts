import {
  FetchTrucksParams,
  useGetTrucksQuery,
} from "@/services/query/vehicles";
import { useSearchParams } from "next/navigation";

export const useTrucks = () => {
  const params = useSearchParams();
  const parameters: FetchTrucksParams = {
    fleetCode: params.get("fleetCode") || "",
    fleetGroupId: params.get("fleetGroupId") || "",
    fleetTypeId: params.get("fleetTypeId") || "",
    licensePlate: params.get("licensePlate") || "",
    locationGroupId: params.get("locationGroupId") || "",
  };

  const payload = () => {
    Object.entries(parameters).forEach(([key, value]) => {
      if (!value) {
        delete parameters[key as keyof FetchTrucksParams];
      }
    });
    return parameters;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    hasPreviousPage,
    isError,
  } = useGetTrucksQuery(payload());

  const trucks = data?.pages.flatMap((page) => page.data) || [];
  const currentPage = data?.pages[data.pages.length - 1]?.currentPage || 1;

  const loadMoreLines = () => {
    if (!hasNextPage && isFetchingNextPage) return;
    fetchNextPage();
  };

  return {
    trucks,
    currentPage,
    hasData: trucks.length > 0,
    isEmpty: trucks.length === 0,
    isLoading: isFetching || isFetchingNextPage,
    isFetchingNextPage,
    loadMoreLines,
    status,
    hasNextPage,
    totalCount: data?.pages[0]?.totalCount || 0,
    hasPreviousPage,
    isError,
  };
};
