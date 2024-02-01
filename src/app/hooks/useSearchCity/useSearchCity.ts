import useSWR from 'swr';
import { fetchCities, CityData } from '@/app/services/city';

export const useSearchCity = (value: string) => {
  const urlEndpoint = value === '' ? null : value;

  const { data, error, isLoading } = useSWR<CityData[]>(
    urlEndpoint,
    fetchCities
  );

  return {
    data,
    error,
    isLoading,
  };
};
