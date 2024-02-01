import '@testing-library/jest-dom';
import React from "react";
import { render } from "@testing-library/react";
import { WeatherCard } from "./WeatherCard";

test("renders WeatherCard correctly", () => {
  const weatherProps = {
    weatherId: 800,
    cityName: "New York",
    temperature: 25,
    speed: 10,
    time: "2023-07-26T20:00",
  };

  const { getByText } = render(<WeatherCard {...weatherProps} />);

  expect(getByText(weatherProps.cityName)).toBeInTheDocument();
  expect(getByText(`${weatherProps.temperature}°C`)).toBeInTheDocument();
  expect(getByText('17:00')).toBeInTheDocument();
  expect(getByText(`${weatherProps.speed}km/h`)).toBeInTheDocument();
});
