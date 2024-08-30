import { useHash } from "@/hooks/useHash";
import { fetchTruckAssignment } from "@/services/vehicles";
import useSWR from "swr";

export const useTruckAssignmentDialog = () => {
  const [hash] = useHash();
  const match = (hash as string)?.match(/#dailyTrip-(.+)/);
  const truckAssignmentId = match?.[1];

  const { data, isLoading } = useSWR(
    { url: "/truck-assignmet", args: { id: truckAssignmentId } },
    fetchTruckAssignment,
  );

  console.log(data);
  return {
    data,
    isLoading,
    truckAssignmentId,
  };
};
