'use client'

import React from 'react';
import { SearchCityForm } from '@/app/components/SearchCityForm';
import { WeatherCard } from '@/app/components/WeatherCard';
import { MainContainer } from '@/app/components/MainContainer';
import { useRouter } from 'next/navigation';
import { ICity } from '@/app/interfaces/city.interface';
import { useWeather } from '@/app/hooks/useWeather';

export function ForecastsTemplate() {
  const { weatherData, isLoading, cityName } = useWeather();
  const router = useRouter();

  const handleCitySelect = (city: ICity | null) => {
    if (!city) {
      router.push(`/add-forecast`);
    } else {
      router.push(`/forecasts?lat=${city?.lat}&lon=${city?.lon}&cityName=${city?.name}`);
    }
  };

  return (
    <MainContainer>
      <SearchCityForm onSelect={handleCitySelect} />
      <WeatherCard>
        {isLoading && <WeatherCard.Loading />}
        {!isLoading && weatherData && (
          <>
            <WeatherCard.Container>
              <WeatherCard.CityName>{cityName}</WeatherCard.CityName>
              <WeatherCard.Time>{weatherData.time}</WeatherCard.Time>
            </WeatherCard.Container>
            <WeatherCard.Temperature temperature={weatherData.temperature} description={weatherData.weatherDescription} />
            <WeatherCard.Container>
              <WeatherCard.WindSpeed>{weatherData.windSpeed}</WeatherCard.WindSpeed>
              {weatherData.icon && <WeatherCard.Icon icon={weatherData.icon} />}
            </WeatherCard.Container>
          </>
        )}
      </WeatherCard>
    </MainContainer>
  );
}
