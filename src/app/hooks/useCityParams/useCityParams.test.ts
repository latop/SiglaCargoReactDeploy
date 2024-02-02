import { renderHook } from "@testing-library/react-hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useCityParams } from "./useCityParams";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("useCityParams", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        cityName: "London",
        lon: "0.1276",
        lat: "51.5074",
      },
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockImplementation((param: string) => {
        if (param === "cityName") {
          return "London";
        } else if (param === "lon") {
          return "0.1276";
        } else if (param === "lat") {
          return "51.5074";
        }
        return null;
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct city name, lon, and lat", () => {
    const { result } = renderHook(() => useCityParams());

    expect(result.current.cityName).toBe("London");
    expect(result.current.lon).toBe("0.1276");
    expect(result.current.lat).toBe("51.5074");
  });
});
