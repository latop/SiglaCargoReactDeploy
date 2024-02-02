export interface ICity {
  name: string;
  shortName: string;
  lat?: number;
  lon?: number;
}

export interface CityResponse {
  display_name: string;
  name: string;
  lat: string;
  lon: string;
  place_id: string;
}
