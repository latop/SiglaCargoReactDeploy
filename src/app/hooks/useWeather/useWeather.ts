import useSWR from 'swr';
import { useCityParams } from '@/app/hooks/useCityParams';
import { fetchWeather } from '@/app/services/weather.service';
import { IWeather } from '@/app/interfaces/weather.interface';

export const useWeather = () => {
  const { lon, lat, cityName } = useCityParams();

  const urlEndpoint = lat && lon ? { lat, lon }  : null;

  const { data: weatherData, error, isLoading } = useSWR<IWeather>(urlEndpoint,
    fetchWeather
  );

  return {
    cityName: cityName?.split(',')[0],
    weatherData,
    error,
    isLoading,
  };
};
