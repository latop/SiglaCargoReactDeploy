import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import { useCityParams } from "@/app/hooks/useCityParams";
import { fetchWeather } from "@/app/services/weather.service";
import { useWeather } from "./useWeather";

jest.mock("swr");
jest.mock("@/app/hooks/useCityParams");
jest.mock("@/app/services/weather.service");

describe("useWeather", () => {
  beforeEach(() => {
    (useCityParams as jest.Mock).mockReturnValue({
      lon: 123,
      lat: 456,
      cityName: "City Name",
    });

    (useSWR as jest.Mock).mockReturnValue({
      data: { temperature: 25, description: "Sunny" },
      error: null,
      isLoading: false,
    });

    (fetchWeather as jest.Mock).mockResolvedValue({
      temperature: 25,
      description: "Sunny",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the cityName, weatherData, error, and isLoading values", () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.cityName).toBe("City Name");
    expect(result.current.weatherData).toEqual({
      temperature: 25,
      description: "Sunny",
    });
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
