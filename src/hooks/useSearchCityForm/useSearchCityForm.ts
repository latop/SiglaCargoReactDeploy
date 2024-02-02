import { useState, SyntheticEvent } from "react";
import { useDebounce } from "use-debounce";
import { useSearchCity } from "@/hooks/useSearchCity";
import { useCityParams } from "@/hooks/useCityParams";
import { ICity } from "@/interfaces/city.interface";
import { useLastSelectedCities } from "@/hooks/useLastSelectedCities";
import { useRouter } from "next/navigation";

export function useSearchCityForm() {
  const router = useRouter();
  const { cityName } = useCityParams();
  const { addCity } = useLastSelectedCities();
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data: options = [], isLoading } = useSearchCity(debouncedInputValue);
  const [open, setOpen] = useState(false);

  const showLastCities = open && !inputValue;

  const handleOpenBackdrop = () => {
    setOpen(true);
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };

  const handleInputChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setInputValue(newInputValue);
  };

  const handleSelectCity = (city: ICity | null) => {
    if (city) {
      addCity(city);
    }
  };

  const handleSelectLastCity = (city: ICity) => {
    handleCloseBackdrop();
    router.push(
      `/forecasts?lat=${city.lat}&lon=${city.lon}&cityName=${city.name}&shortName=${city.shortName}`,
    );
  };

  return {
    onOpenBackdrop: handleOpenBackdrop,
    onCloseBackdrop: handleCloseBackdrop,
    showBackdrop: open,
    onInputChange: handleInputChange,
    options,
    isLoading,
    onSelectCity: handleSelectCity,
    defaultValue: { name: cityName || "", shortName: "", lat: 0, lon: 0 },
    showAutoComplete: open && inputValue.length > 0,
    inputValue,
    onSelectLastCity: handleSelectLastCity,
    showLastCities,
  };
}
