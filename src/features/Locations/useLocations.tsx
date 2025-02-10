import { useGetLocationsQuery } from "@/services/query/trips";

export const useLocations = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    hasPreviousPage,
    refetch: refetchLocations,
  } = useGetLocationsQuery({});

  const locations = data?.pages.flatMap((page) => page.data) || [];
  const currentPage = data?.pages[data.pages.length - 1]?.currentPage || 1;
  const loadMoreLines = () => {
    if (!hasNextPage && isFetchingNextPage) return;
    fetchNextPage();
  };

  return {
    locations,
    currentPage,
    loadMoreLines,
    totalCount: data?.pages[0]?.totalCount || 0,
  };
};
