import useSWR from "swr";
import { fetchCities } from "@/app/services/city.service";
import { ICity } from "@/app/interfaces/city.interface";

export const useSearchCity = (value: string) => {
  const urlEndpoint = value === "" ? null : value;

  const { data, error, isLoading } = useSWR<ICity[]>(urlEndpoint, fetchCities);

  return {
    data,
    error,
    isLoading,
  };
};
