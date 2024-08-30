import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { fetchTruckAssignment } from "@/services/vehicles";
import useSWR from "swr";

export const useTruckAssignmentDialog = () => {
  const [hash] = useHash();
  const [deleteAssignment, { loading: loadingDeletion }] = useFetch();
  const { addToast } = useToast();
  const match = (hash as string)?.match(/#dailyTrip-(.+)/);
  const truckAssignmentId = match?.[1];

  const { data, isLoading } = useSWR(
    { url: "/truck-assignmet", args: { id: truckAssignmentId } },
    fetchTruckAssignment,
  );

  const handleDelete = async () => {
    return await deleteAssignment(
      `/TruckAssignment/${truckAssignmentId}`,
      { id: truckAssignmentId },
      {
        method: "delete",
        onSuccess: () => {
          addToast("Atribuição deletada com sucesso.", { type: "success" });
        },
        onError: () => {
          addToast("Error ao deletar atribuição.", { type: "error" });
        },
      },
    );
  };

  return {
    data,
    isLoading,
    truckAssignmentId,
    handleDelete,
    loadingDeletion,
  };
};
