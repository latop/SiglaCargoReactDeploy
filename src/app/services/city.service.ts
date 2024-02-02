import axios from "axios";
import { CityResponse, ICity } from "@/app/interfaces/city.interface";

const normalizeData = (data: CityResponse): ICity => ({
  name: data.display_name,
  shortName: data.display_name.split(",")[0],
  lat: data.lat,
  lon: data.lon,
  id: data.place_id,
});

export const fetchCities = async (query: string) => {
  const url = `https://geocode.maps.co/search?q=${query}&api_key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data?.map((item: CityResponse) => normalizeData(item));
  } catch (error) {
    throw new Error("Erro ao buscar cidades");
  }
};
