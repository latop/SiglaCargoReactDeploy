import { useHash } from "@/hooks/useHash";
import { useForm } from "react-hook-form";

export function useReleaseDriverDialog() {
  const [hash] = useHash();
  const match = (hash as string)?.match(/#releaseDriverId-(.+)/);
  const releaseDriverId = match?.[1];

  const methods = useForm();
  return {
    releaseDriverId,
    methods,
  };
}
