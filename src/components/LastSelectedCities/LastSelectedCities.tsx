import React, { useCallback } from "react";
import { ICity } from "@/interfaces/city.interface";
import { GoClock } from "react-icons/go";
import { grey } from "@mui/material/colors";
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

interface LastSelectedCityItemProps {
  cityName: string;
  onClick: () => void;
}

const LastSelectedCityItem = React.memo(({ cityName, onClick }: LastSelectedCityItemProps) => {
  return (
    <Item onClick={onClick} role="button" tabIndex={0} aria-label={`Selecionar ${cityName}`}>
      <GoClock />
      <ItemTitle variant="body1">{cityName}</ItemTitle>
    </Item>
  );
});

export function LastSelectedCities({ onSelect }: LastSelectedCitiesProps) {
  const { lastSelectedCities } = useLastSelectedCities();

  const handleCitySelect = useCallback((city: ICity) => {
    onSelect(city);
  }, [onSelect]);

  if (!lastSelectedCities.length) {
    return null;
  }

  return (
    <Card data-testid="last-selected-cities">
      <Title variant="body1" color={grey[900]}>
        Buscas recentes
      </Title>
      <Container>
        {lastSelectedCities.map((city: ICity) => (
          <LastSelectedCityItem key={city.name} cityName={city.name} onClick={() => handleCitySelect(city)} />
        ))}
      </Container>
    </Card>
  );
}
