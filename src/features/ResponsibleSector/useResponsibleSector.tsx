import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/useToast";
import { ResponsibleSectorType } from "@/interfaces/parameters";
import { fetchResponsibleSections } from "@/services/parameters";
import useSWRInfinite from "swr/infinite";

type ResponsibleSectorResponse = {
  currentPage?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  pageSize?: number;
  totalPages?: number;
  data: ResponsibleSectorType[];
  totalCount?: number;
};

export const useResponsibleSector = () => {
  const { addToast } = useToast();
  const [
    deleteResponsibleSector,
    { loading: isLoadingDelete, error: deleteError },
  ] = useFetch();

  const getKey = (pageIndex: number, params: ResponsibleSectorResponse) => {
    return {
      url: "/responsible-section",
      args: { ...params, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };
  const {
    data,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
    mutate: refreshList,
  } = useSWRInfinite<ResponsibleSectorResponse>(
    getKey,
    fetchResponsibleSections,
    {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );

  const responsibleSection = data?.[0].data || [];
  const hasNext = data?.[0].hasNext;
  const hasData = !!data?.[0].data;
  const loadMore = () => {
    if (hasNext && !isValidating) {
      setSize((prevSize) => prevSize + 1);
    }
  };
  const currentPage = data?.[0].currentPage || 0;

  const handleDeleteResponsibleSector = async (id: string) => {
    return await deleteResponsibleSector(`/ResponsibleSector/${id}`, id, {
      method: "delete",
      onSuccess: () => {
        refreshList();
        addToast("Registro apagado com sucesso!");
      },
      onError: () => {
        addToast("Erro ao apagar registro.");
        console.error(deleteError);
      },
    });
  };

  return {
    responsibleSection,
    loadMore,
    isLoading,
    error,
    size,
    hasData,
    currentPage,
    handleDeleteResponsibleSector,
    isLoadingDelete,
  };
};
