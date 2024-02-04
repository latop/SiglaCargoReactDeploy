import { useState, SyntheticEvent } from "react";
import { useDebounce } from "use-debounce";
import { useSearchCity } from "@/hooks/useSearchCity";
import { useCityParams } from "@/hooks/useCityParams";
import { ICity } from "@/interfaces/city.interface";
import { useLastSelectedCities } from "@/hooks/useLastSelectedCities";

export function useSearchCityForm() {
  const { cityName } = useCityParams();
  const { addCity } = useLastSelectedCities();
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data, isLoading, error } = useSearchCity(debouncedInputValue);
  const [isOpenAutocomplete, setIsOpenAutocomplete] = useState(false);
  const [isOpenBackdrop, setIsOpenBackdrop] = useState(false);

  const showLastCities = isOpenAutocomplete && isOpenBackdrop && !inputValue;

  const handleCloseBackdrop = () => {
    setIsOpenBackdrop(false);
  };

  const handleOpenAutocomplete = () => {
    setIsOpenAutocomplete(true);
    setIsOpenBackdrop(true);
  };

  const handleCloseAutocomplete = () => {
    setIsOpenAutocomplete(false);
    setIsOpenBackdrop(false);
  };

  const handleInputChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setInputValue(newInputValue);
  };

  const handleSelectCity = (city: ICity | null) => {
    handleCloseAutocomplete();
    if (city) {
      addCity(city);
    }
  };

  return {
    onOpenAutocomplete: handleOpenAutocomplete,
    onCloseAutocomplete: handleCloseAutocomplete,
    onInputChange: handleInputChange,
    options: data || [],
    noOptionsText:
      !data && !error ? "Carregando..." : "Nenhum resultado encontrado",
    isLoading,
    onSelectCity: handleSelectCity,
    defaultValue: { name: cityName || "", shortName: "", lat: 0, lon: 0 },
    showAutoComplete: isOpenAutocomplete && inputValue.length > 0,
    inputValue,
    showLastCities,
    isOpenBackdrop,
    closeBackdrop: handleCloseBackdrop,
  };
}
