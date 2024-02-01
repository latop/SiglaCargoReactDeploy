import { useSearchParams } from 'next/navigation';

export const useCityParams = (): { cityName: string | null, lon: string | null, lat: string | null } => {
  const searchParams = useSearchParams();
  const cityName = searchParams.get('cityName');
  const lon = searchParams.get('lon');
  const lat = searchParams.get('lat');

  return { cityName, lon, lat };
};
