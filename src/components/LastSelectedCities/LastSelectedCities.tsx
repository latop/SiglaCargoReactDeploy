import React, { useCallback } from "react";
import { ICity } from "@/interfaces/city.interface";
import { GoClock } from "react-icons/go";
import {
  Container,
  Card,
  Item,
  Title,
  ItemTitle,
} from "./LastSelectedCities.styles";
import { useLastSelectedCities } from "@/hooks/useLastSelectedCities";

interface LastSelectedCitiesProps {
  onSelect: (city: ICity) => void;
}

export function LastSelectedCities({ onSelect }: LastSelectedCitiesProps) {
  const { lastSelectedCities } = useLastSelectedCities();

  const handleCitySelect = useCallback((city: ICity) => {
    onSelect(city);
  }, []);

  if (!lastSelectedCities.length) {
    return null;
  }

  return (
    <Card data-testid="last-selected-cities">
      <Title variant="body1" color="GrayText">
        Buscas recentes
      </Title>
      <Container>
        {lastSelectedCities.map((city: ICity) => (
          <Item key={city.name} onClick={() => handleCitySelect(city)}>
            <GoClock />
            <ItemTitle variant="body1">{city.name}</ItemTitle>
          </Item>
        ))}
      </Container>
    </Card>
  );
}
