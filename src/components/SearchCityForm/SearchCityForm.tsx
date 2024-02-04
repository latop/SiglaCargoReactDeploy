"use client";

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  AutocompleteContainer,
  TextFieldContainer,
} from "./SearchCityForm.styles";
import { ICity } from "@/interfaces/city.interface";
import { useSearchCityForm } from "@/hooks/useSearchCityForm";
import { LastSelectedCities } from "@/components/LastSelectedCities";
import { Backdrop } from "@mui/material";

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
    showLastCities,
    showAutoComplete,
    isOpenBackdrop,
    closeBackdrop,
    defaultValue,
    noOptionsText,
  } = useSearchCityForm();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ICity | null,
  ) => {
    onSelect(newValue);
    onSelectCity(newValue);
  };

  const handleSelectLastCity = (newValue: ICity | null) => {
    onSelect(newValue);
    onSelectCity(newValue);
  };

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
      {showLastCities && <LastSelectedCities onSelect={handleSelectLastCity} />}
      <Backdrop
        open={isOpenBackdrop}
        onClick={closeBackdrop}
        data-testid="backdrop-container"
        data-visible={isOpenBackdrop}
      />
    </AutocompleteContainer>
  );
}
