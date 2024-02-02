export interface ICity {
  name: string;
  lat?: number;
  lon?: number;
}

export interface CityResponse {
  name: string;
  latitude: number;
  longitude: number;
  place_id: string;
}
