import axios from 'axios';

export interface CityData {
  name: string;
  shortName: string;
  lat: number;
  lon: number;
}

export interface ResponseData {
  display_name: string;
  lat: number;
  lon: number;
}

const normalizeData = (data: any): CityData => ({
  name: data.display_name,
  shortName: data.display_name.split(',')[0],
  lat: data.lat,
  lon: data.lon,
});

export const fetchCities = async (query: string) => {
  const url = `/api/cities?q=${query}&api_key=65bae3b0bebe0414107206oyp1a8bee`;
  try {
    const response = await axios.get(url);
    return response.data?.map((item: ResponseData) => normalizeData(item));
  } catch (error) {
    throw new Error('Erro ao buscar cidades');
  }
};
