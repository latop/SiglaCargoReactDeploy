import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { SWRConfig } from 'swr';
import CitySearch from './CitySearch';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

// Utility function to wait for a short interval
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('CitySearch', () => {
  it('renders without error', () => {
    render(<CitySearch onSelect={() => {}} />);
    expect(screen.getByPlaceholderText('Busque por uma cidade')).toBeInTheDocument();
  });

  it('displays noOptionsText when no options are available', async () => {
    render(<CitySearch onSelect={() => {}} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'RandomCityName' } });

    // Mock the response to return an empty array
    axios.get = jest.fn().mockResolvedValue({ data: [] });

    await waitFor(() => {
      expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
    });
  });

  it('displays options when available', async () => {
    render(<CitySearch onSelect={() => {}} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'London' } });

    // Mock the response to return some options
    const mockData = [
      { lat: 51.5074, lon: -0.1278, name: 'London, UK' },
      { lat: 40.7128, lon: -74.0060, name: 'New York, US' },
    ];
    axios.get = jest.fn().mockResolvedValue({ data: mockData });

    await waitFor(() => {
      expect(screen.getByText('London, UK')).toBeInTheDocument();
      expect(screen.getByText('New York, US')).toBeInTheDocument();
    });
  });

  it('calls onSelect when an option is selected', async () => {
    const handleSelect = jest.fn();
    render(<CitySearch onSelect={handleSelect} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Paris' } });

    // Mock the response to return an option
    const mockData = [{ lat: 48.8566, lon: 2.3522, name: 'Paris, France' }];
    axios.get = jest.fn().mockResolvedValue({ data: mockData });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Paris, France'));
      expect(handleSelect).toHaveBeenCalledWith({ lat: 48.8566, lon: 2.3522, name: 'Paris, France' });
    });
  });
});
