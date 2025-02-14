import { useHash } from "@/hooks/useHash";
import { FetchLocationsParams } from "@/interfaces/trip";
import { useGetLocationsQuery } from "@/services/query/trips";
import { useSearchParams } from "next/navigation";

export const useLocations = () => {
  const params = useSearchParams();
  const parameters: Partial<FetchLocationsParams> = {
    codeIntegration2: params.get("integrationCode2") || "",
    codeIntegration1: params.get("integrationCode") || "",
    locationTypeId: params.get("locationTypeId") || "",
    code: params.get("locationCode") || "",
    isOperation: Boolean(params.get("isOperation")) || false,
  };
  const [hash, setHash] = useHash();

  const handleAddLocation = () => {
    setHash("add-location");
  };

  const isToAddLocation = (hash as string)?.match(/#add-location/);
  const locationId = (hash as string)?.match(/#location-id-(.+)/)?.[1];

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

  const handleEditLocation = (id: string) => {
    setHash(`location-id-${id}`);
  };

  const handleCloseDialog = () => {
    setHash("");
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
    handleEditLocation,
    handleAddLocation,
    locationId,
    isToAddLocation,
    handleCloseDialog,
  };
};
