'use client'

import React from 'react';
import { SearchCityForm } from '@/app/components/SearchCityForm';
import { MainContainer } from '@/app/components/MainContainer';

import { useRouter } from 'next/navigation';
import { ICity } from '@/app/interfaces/city.interface';

export function AddForecastTemplate() {
  const router = useRouter();

  const handleCitySelect = (city: ICity | null) => {
    if (city) {
      router.push(`/forecasts?lat=${city?.lat}&lon=${city?.lon}&cityName=${city?.name}`);
    }
  };

  return (
    <MainContainer>
      <SearchCityForm onSelect={handleCitySelect} />
    </MainContainer>
  );
}
