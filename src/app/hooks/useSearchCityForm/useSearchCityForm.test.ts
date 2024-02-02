import { renderHook, act } from "@testing-library/react-hooks";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useSearchCity } from "@/app/hooks/useSearchCity";
import { useCityParams } from "@/app/hooks/useCityParams";
import { useLastSelectedCities } from "@/app/hooks/useLastSelectedCities";
import { useSearchCityForm } from "./useSearchCityForm";

jest.mock("next/navigation");
jest.mock("use-debounce");
jest.mock("@/app/hooks/useSearchCity");
jest.mock("@/app/hooks/useCityParams");
jest.mock("@/app/hooks/useLastSelectedCities");

describe("useSearchCityForm", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockUseRouter = useRouter as jest.Mock;
  const mockUseDebounce = useDebounce as jest.Mock;
  const mockUseSearchCity = useSearchCity as jest.Mock;
  const mockUseCityParams = useCityParams as jest.Mock;
  const mockUseLastSelectedCities = useLastSelectedCities as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseDebounce.mockReturnValue(["", jest.fn()]);
    mockUseSearchCity.mockReturnValue({
      data: [],
      isLoading: false,
    });
    mockUseCityParams.mockReturnValue({
      cityName: "",
    });
    mockUseLastSelectedCities.mockReturnValue({
      addCity: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set the input value", () => {
    const { result } = renderHook(() => useSearchCityForm());

    act(() => {
      result.current.onInputChange(null, "New York");
    });

    expect(result.current.inputValue).toBe("New York");
  });

  it("should add a city when selecting a city", () => {
    const { result } = renderHook(() => useSearchCityForm());

    const city = { id: "1", name: "New York", shortName: 'New York' };

    act(() => {
      result.current.onSelectCity(city);
    });

    expect(mockUseLastSelectedCities().addCity).toHaveBeenCalledWith(city);
  });

  it("should navigate to the forecast page when selecting a last city", () => {
    const { result } = renderHook(() => useSearchCityForm());

    const city = { id: "1", name: "New York", lat: 40.7128, lon: -74.006, shortName: 'New York' };

    act(() => {
      result.current.onSelectLastCity(city);
    });

    expect(mockRouter.push).toHaveBeenCalledWith(
      `/forecasts?lat=${city.lat}&lon=${city.lon}&cityName=${city.name}&shortName=${city.shortName}`,
    );
  });
});
