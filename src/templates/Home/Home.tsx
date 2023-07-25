'use client'

import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { WeatherCard, CitySearch } from '@/components';

interface CityProp {
  lat?: number | string;
  lon?: number | string;
  name: string;
}

interface WeatherData {
  weatherId: number;
  cityName: string;
  temperature: number;
  speed: number;
  time: string;
  isDay: boolean;
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<CityProp | null>(null);

  const handleCitySelect = (city: CityProp | null) => {
    setSelectedCity(city);
  };

  const { data: weatherData, error: weatherError } = useSWR(
    selectedCity ? `/api/weather/data?lat=${selectedCity.lat}&long=${selectedCity.lon}` : null,
    (url) => axios.get(url).then((res) => res.data)
  );

  const loading = !weatherData && !weatherError;

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        padding: '6rem 1rem',
        minHeight: '100vh',
      }}
    >
      <CitySearch onSelect={handleCitySelect} />
      {selectedCity && (
        <WeatherCard
          loading={loading}
          weatherId={weatherData?.weathercode}
          cityName={selectedCity.name.split(',')[0]}
          temperature={weatherData?.temperature}
          speed={weatherData?.windspeed}
          time={weatherData?.time}
          isDay={Boolean(weatherData?.is_day)}
        />
      )}
    </main>
  );
}
