"use client";

import React from "react";
import { SearchCityForm } from "@/app/components/SearchCityForm";
import { WeatherCard } from "@/app/components/WeatherCard";
import { MainContainer } from "@/app/components/MainContainer";
import { useRouter } from "next/navigation";
import { ICity } from "@/app/interfaces/city.interface";
import { useWeather } from "@/app/hooks/useWeather";

export function ForecastsTemplate() {
  const { weatherData, isLoading, cityName, update, isUpdating } = useWeather();
  const router = useRouter();

  const handleCitySelect = (city: ICity | null) => {
    if (!city) {
      router.push(`/add-forecast`);
    } else {
      router.push(
        `/forecasts?lat=${city?.lat}&lon=${city?.lon}&cityName=${city?.name}`,
      );
    }
  };

  return (
    <MainContainer>
      <SearchCityForm onSelect={handleCitySelect} />
      <WeatherCard>
        {isLoading && <WeatherCard.Loading />}
        {!isLoading && weatherData && (
          <>
            <WeatherCard.Header>
              <WeatherCard.CityName>{cityName}</WeatherCard.CityName>
              <WeatherCard.WeatherUpdate
                onClick={update}
                isUpdating={isUpdating}
              />
              {/* <WeatherCard.Time>{weatherData.time}</WeatherCard.Time> */}
            </WeatherCard.Header>
            <WeatherCard.Temperature
              temperature={weatherData.temperature}
              description={weatherData.weatherDescription}
            />
            <WeatherCard.Bottom>
              <WeatherCard.WeatherInfo
                windSpeed={weatherData.windSpeed}
                time={weatherData.time}
              />
              {weatherData.icon && <WeatherCard.Icon icon={weatherData.icon} />}
            </WeatherCard.Bottom>
          </>
        )}
      </WeatherCard>
    </MainContainer>
  );
}
