import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteContainer, TextFieldContainer, BackdropContainer } from './SearchCityForm.styles';
import { ICity } from '@/app/interfaces';
import { useSearchCityForm } from '@/app/hooks/useSearchCityForm';

interface SearchCityFormProps {
  onSelect: (params: ICity | null) => void;
}

export function SearchCityForm({ onSelect }: SearchCityFormProps) {
  const {
    openBackdrop,
    closeBackdrop,
    showBackdrop,
    onInputChange,
    options,
    isLoading,
    openAutoComplete,
    defaultValue,
  } = useSearchCityForm();

  return (
    <>
      <AutocompleteContainer>
        <Autocomplete
          id="city-search"
          data-testid="city-search"
          options={options}
          defaultValue={defaultValue}
          open={openAutoComplete}
          loading={isLoading}
          noOptionsText="Nenhum resultado encontrado"
          loadingText="Carregando..."
          getOptionLabel={(option: ICity) => option.name}
          onInputChange={onInputChange}
          onBlur={closeBackdrop}
          onChange={(event, newValue: ICity | null) => {
            onSelect(newValue);
          }}
          onOpen={openBackdrop}
          onClose={closeBackdrop}
          renderInput={(params) => (
            <TextFieldContainer
              hiddenLabel
              {...params}
              placeholder="Busque por uma cidade"
              variant="outlined"
            />
          )}
        />
      </AutocompleteContainer>
      <BackdropContainer open={showBackdrop} />
    </>
  );
}
