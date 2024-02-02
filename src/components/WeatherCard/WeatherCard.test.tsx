import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@/testUtils";
import { WeatherCard } from "./WeatherCard";

describe("WeatherCard", () => {
  it("renders loading indicator when loading is true", () => {
    render(<WeatherCard loading={true}>Card Content</WeatherCard>);
    expect(screen.getByTestId("card-loading")).toBeInTheDocument();
  });

  it("renders card content when loading is false", () => {
    render(<WeatherCard loading={false}>Card Content</WeatherCard>);
    expect(screen.getByTestId("card-container")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });
});
