import useSWR from "swr";
import { useCityParams } from "@/hooks/useCityParams";
import { fetchWeather } from "@/services/weather.service";
import { IWeather } from "@/interfaces/weather.interface";

export const useWeather = () => {
  const { lon, lat, shortName } = useCityParams();

  const urlEndpoint =
    lat && lon && shortName ? { lat, lon, cityName: shortName } : null;

  const {
    data: weatherData,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR<IWeather>(urlEndpoint, fetchWeather, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  const handleUpdate = () => {
    mutate(weatherData, true);
  };

  return {
    weatherData,
    error,
    isLoading,
    update: handleUpdate,
    isUpdating: isValidating,
  };
};
