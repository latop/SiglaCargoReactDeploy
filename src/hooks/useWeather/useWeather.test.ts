import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import { useCityParams } from "@/hooks/useCityParams";
import { fetchWeather } from "@/services/weather.service";
import { useWeather } from "./useWeather";

jest.mock("swr");
jest.mock("@/hooks/useCityParams");
jest.mock("@/services/weather.service");

describe("useWeather", () => {
  beforeEach(() => {
    (useCityParams as jest.Mock).mockReturnValue({
      lon: 123,
      lat: 456,
      cityName: "City Name",
    });

    (useSWR as jest.Mock).mockReturnValue({
      data: { temperature: 25, description: "Sunny", cityName: "City Name" },
      error: null,
      isLoading: false,
    });

    (fetchWeather as jest.Mock).mockResolvedValue({
      temperature: 25,
      description: "Sunny",
      cityName: "City Name",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the cityName, weatherData, error, and isLoading values", () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.weatherData).toEqual({
      temperature: 25,
      description: "Sunny",
      cityName: 'City Name',
    });
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
