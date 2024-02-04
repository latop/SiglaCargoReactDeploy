import { renderHook, act } from "@testing-library/react-hooks";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useSearchCity } from "@/hooks/useSearchCity";
import { useCityParams } from "@/hooks/useCityParams";
import { useLastSelectedCities } from "@/hooks/useLastSelectedCities";
import { useSearchCityForm } from "./useSearchCityForm";

jest.mock("next/navigation");
jest.mock("use-debounce");
jest.mock("@/hooks/useSearchCity");
jest.mock("@/hooks/useCityParams");
jest.mock("@/hooks/useLastSelectedCities");

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

    const city = { id: "1", name: "New York", shortName: "New York" };

    act(() => {
      result.current.onSelectCity(city);
    });

    expect(mockUseLastSelectedCities().addCity).toHaveBeenCalledWith(city);
  });
});
