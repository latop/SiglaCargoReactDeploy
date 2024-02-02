export interface ICity {
  name: string;
  shortName?: string;
  lat?: number;
  lon?: number;
  id?: string;
}

export interface CityResponse {
  display_name: string;
  lat: number;
  lon: number;
  place_id: string;
}
