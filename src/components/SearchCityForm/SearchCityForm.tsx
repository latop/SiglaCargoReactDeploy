"use client";

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  AutocompleteContainer,
  TextFieldContainer,
  BackdropContainer,
} from "./SearchCityForm.styles";
import { ICity } from "@/interfaces/city.interface";
import { useSearchCityForm } from "@/hooks/useSearchCityForm";
import { LastSelectedCities } from "@/components/LastSelectedCities";

interface SearchCityFormProps {
  onSelect: (params: ICity | null) => void;
}

export function SearchCityForm({ onSelect }: SearchCityFormProps) {
  const {
    onOpenBackdrop,
    onCloseBackdrop,
    showBackdrop,
    onInputChange,
    options,
    isLoading,
    onSelectCity,
    onSelectLastCity,
    showAutoComplete,
    showLastCities,
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
          open={showAutoComplete}
          loading={isLoading}
          noOptionsText="Nenhum resultado encontrado"
          loadingText="Carregando..."
          getOptionLabel={(option: ICity) => option.name}
          onInputChange={onInputChange}
          onChange={(event, newValue: ICity | null) => {
            onSelect(newValue);
            onSelectCity(newValue);
          }}
          onOpen={onOpenBackdrop}
          onClose={onCloseBackdrop}
          renderInput={(params) => (
            <>
              <TextFieldContainer
                hiddenLabel
                {...params}
                placeholder="Busque por uma cidade"
                variant="outlined"
              />
            </>
          )}
        />
        {showLastCities && <LastSelectedCities onSelect={onSelectLastCity} />}
      </AutocompleteContainer>
      <BackdropContainer
        data-testid="backdrop-container"
        onClick={onCloseBackdrop}
        open={showBackdrop}
      />
    </>
  );
}
