'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDebounce } from 'use-debounce';
import Backdrop from '@mui/material/Backdrop';
import styled from '@emotion/styled';
import useSWR from 'swr';
import axios from 'axios';

const AutocompleteContainer = styled('div')`
  width: 100%;
  max-width: 500px;
`;

const TextFieldContainer = styled(TextField)`
  z-index: 1000;
`;

const BackdropContainer = styled(Backdrop)`
  color: #fff;
  z-index: 1;
`;

interface CityProps {
  lat?: number | string;
  lon?: number | string;
  name: string;
}

interface CitySearchProps {
  onSelect: (params: CityProps | null) => void;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export default function CitySearch({ onSelect }: CitySearchProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const [open, setOpen] = useState(false);

  const { data: options = [], error } = useSWR(
    debouncedInputValue === '' ? null : `/api/weather/cities?address=${debouncedInputValue}`,
    fetcher
  );

  return (
    <>
      <AutocompleteContainer>
        <Autocomplete
          id="city-search"
          options={options}
          loading={!error && !options.length}
          noOptionsText="Nenhum resultado encontrado"
          loadingText={<span>{inputValue ? 'Carregando...' : 'Digite a cidade'}</span>}
          getOptionLabel={(option: CityProps) => option.name}
          onInputChange={(event, newInputValue: string) => {
            setInputValue(newInputValue);
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
