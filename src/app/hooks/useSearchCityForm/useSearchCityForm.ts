import { useState, SyntheticEvent } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchCity } from '@/app/hooks/useSearchCity';
import { useCityParams } from '@/app/hooks/useCityParams';
import { ICity } from '@/app/interfaces/city.interface';
import { useLastSelectedCities } from '@/app/hooks/useLastSelectedCities';
import { useRouter } from 'next/navigation';

export function useSearchCityForm() {
  const router = useRouter();
  const { cityName } = useCityParams();
  const { addCity } = useLastSelectedCities();
  const [inputValue, setInputValue] = useState('');
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

  const handleInputChange = (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
    setInputValue(newInputValue);
  }

  const handleSelectCity = (city: ICity | null) => {
    if (city) {
      addCity(city);
    }
  }

  const handleSelectLastCity = (city: ICity) => {
    handleCloseBackdrop();
    router.push(`/forecasts?lat=${city.lat}&lon=${city.lon}&cityName=${city.name}`);
  }

  return {
    onOpenBackdrop: handleOpenBackdrop,
    onCloseBackdrop: handleCloseBackdrop,
    showBackdrop: open,
    onInputChange: handleInputChange,
    options,
    isLoading,
    onSelectCity: handleSelectCity,
    defaultValue: { name: cityName || '' },
    showAutoComplete: open && inputValue.length > 0,
    inputValue,
    onSelectLastCity: handleSelectLastCity,
    showLastCities,
  }
}
