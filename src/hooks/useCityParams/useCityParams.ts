import { useSearchParams } from "next/navigation";

export const useCityParams = (): {
  cityName: string;
  shortName: string;
  lon: string;
  lat: string;
} => {
  const searchParams = useSearchParams();
  const cityName = searchParams.get("cityName") || "";
  const shortName = searchParams.get("shortName") || "";
  const lon = searchParams.get("lon") || "";
  const lat = searchParams.get("lat") || "";

  return { cityName, lon, lat, shortName };
};
