import { IconType } from "react-icons";

export interface WeatherResponse {
  current_weather: {
    weathercode: number;
    display_name: string;
    temperature: number;
    windspeed: number;
    time: string;
    is_day: boolean;
  }
}

export interface IWeather {
  temperature: string;
  windSpeed: string;
  weatherCode: number;
  time: string | null;
  icon?: IconType;
  weatherDescription?: string;
  name: string;
  isDay: boolean;
}
