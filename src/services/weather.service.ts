import axios from "axios";
import { getWeatherCodes, formatTime } from "@/utils";
import { IWeather, WeatherResponse } from "@/interfaces/weather.interface";

interface INormalizeData {
  data: WeatherResponse;
  cityName: string;
}

const normalizeData = ({ data, cityName }: INormalizeData): IWeather => ({
  temperature: `${data.current_weather.temperature.toFixed(0)}${
    data.current_weather_units.temperature
  }`,
  windSpeed: `${data.current_weather.windspeed.toFixed(0)}${
    data.current_weather_units.windspeed
  }`,
  weatherCode: data.current_weather.weathercode,
  time: formatTime(data.current_weather.time),
  windDirection: `${data.current_weather.winddirection}${data.current_weather_units.winddirection}`,
  icon: getWeatherCodes(
    data.current_weather.weathercode,
    data.current_weather.is_day,
  )?.icon,
  weatherDescription: getWeatherCodes(
    data.current_weather.weathercode,
    data.current_weather.is_day,
  )?.title,
  name: data.current_weather.display_name,
  isDay: data.current_weather.is_day,
  cityName,
});

interface fetchWeatherOptions {
  lat: string;
  lon: string;
  cityName: string;
}

export const fetchWeather = async (options: fetchWeatherOptions) => {
  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: options.lat,
        longitude: options.lon,
        current_weather: true,
      },
    });
    return normalizeData({ data: response.data, cityName: options.cityName });
  } catch (error) {
    throw new Error("Erro ao buscar temperatura");
  }
};
