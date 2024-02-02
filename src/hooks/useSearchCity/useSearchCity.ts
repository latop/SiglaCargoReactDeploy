import useSWR from "swr";
import { fetchCities } from "@/services/city.service";
import { ICity } from "@/interfaces/city.interface";

export const useSearchCity = (value: string) => {
  const urlEndpoint = value === "" ? null : value;

  const { data, error, isLoading } = useSWR<ICity[]>(urlEndpoint, fetchCities);

  return {
    data,
    error,
    isLoading,
  };
};
