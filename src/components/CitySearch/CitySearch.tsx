'use client'

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

export default function CitySearch({ onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let active = true;

    if (debouncedInputValue === '') {
      setOptions([]);
      return undefined;
    }

    (async () => {
      try {
        const response = await axios.get(`/api/weather/cities?address=${debouncedInputValue}`);
        if (active) {
          setOptions(response.data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    })();

    return () => {
      active = false;
    };
  }, [debouncedInputValue]);

  return (
    <Autocomplete
      id="city-search"
      style={{ width: 500 }}
      options={options}
      loading
      noOptionsText="Nenhum resultado encontrado"
      loadingText={<span>{inputValue ? 'Loading...' : ''}</span>}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        onSelect(newValue || {
          name: '',
          lat: null,
          lon: null
        });
      }}
      renderInput={(params) => (
        <TextField style={{ maxLines: 1 }} {...params} label="Busque por uma cidade" variant="outlined" />
      )}
    />
  );
}
