import axios from "axios";
import { CityResponse, ICity } from "@/app/interfaces/city.interface";

const normalizeData = (data: CityResponse): ICity => ({
  name: data.name,
  lat: data.latitude,
  lon: data.longitude,
});

export const fetchCities = async (query: string) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/city', {
      params: { name: query, limit: 5 },
      headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_GEOCODE_API_KEY },
    });
    return response.data?.map((item: CityResponse) => normalizeData(item));
  } catch (error) {
    throw new Error("Erro ao buscar cidades");
  }
};
