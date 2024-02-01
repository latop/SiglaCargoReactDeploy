import { useState, SyntheticEvent } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchCity } from '@/app/hooks/useSearchCity';
import { useCityParams } from '@/app/hooks/useCityParams';

export function useSearchCityForm() {
  const { cityName } = useCityParams();
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data: options = [], isLoading } = useSearchCity(debouncedInputValue);
  const [open, setOpen] = useState(false);
  
  const handleOpenBackdrop = () => {
    setOpen(true);
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };

  const handleInputChange = (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
    setInputValue(newInputValue);
  }

  return {
    openBackdrop: handleOpenBackdrop,
    closeBackdrop: handleCloseBackdrop,
    showBackdrop: open,
    onInputChange: handleInputChange,
    options,
    isLoading,
    defaultValue: { name: cityName || '' },
    openAutoComplete: open && inputValue.length > 0,
    inputValue,
  }
}
