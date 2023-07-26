import { IconType } from "react-icons";

export interface ICity {
  lat?: number | string;
  lon?: number | string;
  name: string;
}

export interface IWeatherInfo {
  id: number;
  name: string;
  title: string;
  icon: IconType;
}
