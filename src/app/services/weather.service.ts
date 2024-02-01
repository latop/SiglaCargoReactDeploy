import axios from 'axios';
import { getWeatherCodes, formatTime } from '@/app/utils';
import { IWeather, WeatherResponse } from '@/app/interfaces/weather.interface';


const normalizeData = (data: WeatherResponse): IWeather => ({
  temperature: `${data.current_weather.temperature.toFixed(0)}°C`,
  windSpeed: `${data.current_weather.windspeed.toFixed(0)}km/h`,
  weatherCode: data.current_weather.weathercode,
  time: formatTime(data.current_weather.time),
  icon: getWeatherCodes(data.current_weather.weathercode, data.current_weather.is_day)?.icon,
  weatherDescription: getWeatherCodes(data.current_weather.weathercode, data.current_weather.is_day)?.title,
  name: data.current_weather.display_name,
  isDay: data.current_weather.is_day,
});

interface fetchWeatherOptions {
  lat: string, lon: string
}

export const fetchWeather = async (options: fetchWeatherOptions) => {
  const url = `/api/forecast?latitude=${options.lat}&longitude=${options.lon}&current_weather=true`;
  try {
    const response = await axios.get(url);
    return normalizeData(response.data);
  } catch (error) {
    throw new Error('Erro ao buscar temperatura');
  }
};
