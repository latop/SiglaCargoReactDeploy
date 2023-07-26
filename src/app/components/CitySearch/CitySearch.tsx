import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useDebounce } from 'use-debounce';
import useSWR from 'swr';
import axios from 'axios';
import { AutocompleteContainer, TextFieldContainer, BackdropContainer } from './CitySearch.styles';
import { ICity } from '@/app/interfaces';

interface CitySearchProps {
  onSelect: (params: ICity | null) => void;
}

export default function CitySearch({ onSelect }: CitySearchProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const [open, setOpen] = useState(false);

  const urlEndpoint = debouncedInputValue === '' ? null : `/api/weather/cities?address=${debouncedInputValue}`;

  const { data: options = [], error } = useSWR(
    urlEndpoint,
    (url) => axios.get(url).then((res) => res.data)
  );

  return (
    <>
      <AutocompleteContainer>
        <Autocomplete
          id="city-search"
          options={options}
          open={open && inputValue.length > 0}
          loading={!error && !options.length}
          noOptionsText="Nenhum resultado encontrado"
          loadingText="Carregando..."
          getOptionLabel={(option: CityProps) => option.name}
          onInputChange={(event, newInputValue: string) => {
            setInputValue(newInputValue);
          }}
          onBlur={() => {
            setOpen(false);
          }}
          onChange={(event, newValue: CityProps | null) => {
            onSelect(newValue);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
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
      <BackdropContainer open={open} />
    </>
  );
}
