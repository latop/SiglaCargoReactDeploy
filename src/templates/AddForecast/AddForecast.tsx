"use client";

import React, { useCallback, useEffect } from "react";
import { SearchCityForm } from "@/components/SearchCityForm";
import { MainContainer } from "@/components/MainContainer";

import { useRouter } from "next/navigation";
import { ICity } from "@/interfaces/city.interface";

export function AddForecastTemplate() {
  const router = useRouter();

  const handleCitySelect = useCallback(
    (city: ICity | null) => {
      if (city) {
        router.push(
          `/forecasts?lat=${city?.lat}&lon=${city?.lon}&cityName=${city?.name}&shortName=${city?.shortName}`,
        );
      }
    },
    [router],
  );

  useEffect(() => {
    router.prefetch("/forecasts");
  }, [router]);

  return (
    <MainContainer>
      <SearchCityForm onSelect={handleCitySelect} />
    </MainContainer>
  );
}
