import { IconType } from "react-icons";

export interface WeatherResponse {
  current_weather: {
    weathercode: number;
    display_name: string;
    temperature: number;
    windspeed: number;
    time: string;
    is_day: boolean;
    winddirection: number;
  };
  current_weather_units: {
    temperature: string;
    windspeed: string;
    winddirection: string;
  };
}

export interface IWeather {
  temperature: string;
  windSpeed: string;
  windDirection: string;
  weatherCode: number;
  time: string;
  icon?: IconType;
  weatherDescription?: string;
  name: string;
  isDay: boolean;
  cityName: string;
}
