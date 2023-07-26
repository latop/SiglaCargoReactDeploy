'use client'

import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { WeatherCard, CitySearch } from '@/app/components';
import { MainContainer } from './Home.styles';
import { ICity } from '@/app/interfaces';

interface WeatherData {
  weathercode: number;
  cityName: string;
  temperature: number;
  windspeed: number;
  time: string;
  is_day: boolean;
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

  const handleCitySelect = (city: ICity | null) => {
    setSelectedCity(city);
  };

  const urlEndpoint = selectedCity ? `/api/weather/data?lat=${selectedCity.lat}&long=${selectedCity.lon}` : null;

  const { data: weatherData, error: weatherError } = useSWR<WeatherData>(urlEndpoint,
    (url) => axios.get(url).then((res) => res.data)
  );
  
  const loading = !weatherData && !weatherError;

  return (
    <MainContainer>
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
    </MainContainer>
  );
}
