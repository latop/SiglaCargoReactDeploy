import axios from "axios";
import { ICity, CityResponse } from "@/interfaces/city.interface";

const normalizeData = (data: CityResponse): ICity => ({
  name: data.display_name,
  shortName: data.name,
  lat: parseFloat(data.lat),
  lon: parseFloat(data.lon),
});

export const fetchCities = async (query: string) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          limit: 5,
        },
        headers: {
          "User-Agent": "YourAppName/1.0",
        },
      },
    );
    return response.data.map((item: CityResponse) => normalizeData(item));
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Erro ao buscar cidades");
  }
};
