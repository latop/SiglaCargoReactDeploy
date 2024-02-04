"use client";

import React, { useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  AutocompleteContainer,
  TextFieldContainer,
} from "./SearchCityForm.styles";
import { ICity } from "@/interfaces/city.interface";
import { useSearchCityForm } from "@/hooks/useSearchCityForm";
import { LastSelectedCities } from "@/components/LastSelectedCities";

interface SearchCityFormProps {
  onSelect: (params: ICity | null) => void;
}

export function SearchCityForm({ onSelect }: SearchCityFormProps) {
  const {
    onOpenAutocomplete,
    onCloseAutocomplete,
    onInputChange,
    options,
    isLoading,
    onSelectCity,
    onSelectLastCity,
    showLastCities,
    showAutoComplete,
    defaultValue,
    noOptionsText,
  } = useSearchCityForm();

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: ICity | null) => {
    onSelect(newValue);
    onSelectCity(newValue);
  },[onSelect, onSelectCity]);

  return (
    <AutocompleteContainer>
      <Autocomplete
        id="city-search"
        data-testid="city-search"
        clearOnEscape
        options={options}
        defaultValue={defaultValue}
        open={showAutoComplete}
        loading={isLoading}
        noOptionsText={noOptionsText}
        loadingText="Carregando..."
        getOptionLabel={(option: ICity) => option.name}
        onInputChange={onInputChange}
        onChange={handleChange}
        onOpen={onOpenAutocomplete}
        onClose={onCloseAutocomplete}
        renderInput={(params) => (
          <TextFieldContainer
            hiddenLabel
            {...params}
            placeholder="Busque por uma cidade"
            variant="outlined"
          />
        )}
      />
      {showLastCities && <LastSelectedCities onSelect={onSelectLastCity} />}
    </AutocompleteContainer>
  );
}
