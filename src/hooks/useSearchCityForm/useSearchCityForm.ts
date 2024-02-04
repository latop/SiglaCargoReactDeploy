import { useState, SyntheticEvent, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useSearchCity } from "@/hooks/useSearchCity";
import { useCityParams } from "@/hooks/useCityParams";
import { useBackdrop } from "@/hooks/useBackdrop";
import { ICity } from "@/interfaces/city.interface";
import { useLastSelectedCities } from "@/hooks/useLastSelectedCities";

export function useSearchCityForm() {
  const { cityName } = useCityParams();
  const { addCity } = useLastSelectedCities();
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data, isLoading, error } = useSearchCity(debouncedInputValue);
  const [isOpenAutocomplete, setIsOpenAutocomplete] = useState(false);
  const { openBackdrop, closeBackdrop } = useBackdrop();

  const showLastCities = isOpenAutocomplete && !inputValue;

  const handleOpenAutocomplete = useCallback(() => {
    setIsOpenAutocomplete(true);
    openBackdrop({ onClose: handleCloseAutocomplete });
  }, [openBackdrop]);

  const handleCloseAutocomplete = useCallback(() => {
    setIsOpenAutocomplete(false);
    closeBackdrop();
  }, [closeBackdrop]);

  const handleInputChange = useCallback(
    (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    [],
  );

  const handleSelectCity = useCallback(
    (city: ICity | null) => {
      handleCloseAutocomplete();
      if (city) {
        addCity(city);
      }
    },
    [addCity, handleCloseAutocomplete],
  );

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
  };
}
