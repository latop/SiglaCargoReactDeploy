"use client";

import React from "react";
import { SearchCityForm } from "@/components/SearchCityForm";
import { WeatherCard } from "@/components/WeatherCard";
import { MainContainer } from "@/components/MainContainer";
import { useRouter } from "next/navigation";
import { ICity } from "@/interfaces/city.interface";
import { useWeather } from "@/hooks/useWeather";

export function ForecastsTemplate() {
  const { weatherData, isLoading, update, isUpdating } = useWeather();
  const router = useRouter();

  const handleCitySelect = (city: ICity | null) => {
    if (!city) {
      router.push(`/add-forecast`);
    } else {
      router.push(
        `/forecasts?lat=${city?.lat}&lon=${city?.lon}&cityName=${city?.name}&shortName=${city?.shortName}`,
      );
    }
  };

  return (
    <MainContainer>
      <SearchCityForm onSelect={handleCitySelect} />
      <WeatherCard loading={isLoading}>
        {weatherData && (
          <>
            <WeatherCard.Header>
              <WeatherCard.CityName>
                {weatherData.cityName}
              </WeatherCard.CityName>
              <WeatherCard.WeatherUpdate
                onClick={update}
                isUpdating={isUpdating}
              />
            </WeatherCard.Header>
            <WeatherCard.Temperature
              temperature={weatherData.temperature}
              description={weatherData.weatherDescription}
            />
            <WeatherCard.Footer>
              <WeatherCard.WeatherInfo
                windSpeed={weatherData.windSpeed}
                time={weatherData.time}
              />
              {weatherData.icon && <WeatherCard.Icon icon={weatherData.icon} />}
            </WeatherCard.Footer>
          </>
        )}
      </WeatherCard>
    </MainContainer>
  );
}
