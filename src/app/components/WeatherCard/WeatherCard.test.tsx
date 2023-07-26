import '@testing-library/jest-dom';
import React from "react";
import { render } from "@testing-library/react";
import WeatherCard from "./WeatherCard";

test("renders WeatherCard correctly", () => {
  const weatherProps = {
    weatherId: 800,
    cityName: "New York",
    temperature: 25,
    speed: 10,
    time: "12:00 PM",
  };

  const { getByText } = render(<WeatherCard {...weatherProps} />);

  expect(getByText(weatherProps.cityName)).toBeInTheDocument();
  expect(getByText(`${weatherProps.temperature}°C`)).toBeInTheDocument();
  expect(getByText(weatherProps.time)).toBeInTheDocument();
  expect(getByText(`${weatherProps.speed}km/h`)).toBeInTheDocument();
});
