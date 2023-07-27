import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from './CitySearch';
import axios from 'axios';
import { SWRConfig } from 'swr';
import "@testing-library/jest-dom";

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CitySearch", () => {
  it("should fetch and display city options based on input", async () => {
    const onSelectMock = jest.fn();
    const mockData = [
      { name: 'São Paulo, Brazil', lat: '-23.5505', lon: '-46.6333' },
      { name: 'San Francisco, USA', lat: '37.7749', lon: '-122.4194' }
    ];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const { getByRole } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CitySearch onSelect={onSelectMock} />
      </SWRConfig>
    );

    const searchInput = getByRole('combobox');
    userEvent.type(searchInput, 'San');

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByRole('listbox')).toBeInTheDocument());
    const listItems = getByRole('listbox').querySelectorAll('li');
    expect(listItems).toHaveLength(1);
    expect(listItems[0].textContent).toBe('San Francisco, USA');
  });

  it("should call onSelect when a city is selected", async () => {
    const onSelectMock = jest.fn();
    const mockData = [
      { name: 'São Paulo, Brazil', lat: '-23.5505', lon: '-46.6333' }
    ];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const { getByRole } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CitySearch onSelect={onSelectMock} />
      </SWRConfig>
    );

    const searchInput = getByRole('combobox');
    userEvent.type(searchInput, 'São Paulo');

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByRole('listbox')).toBeInTheDocument());
    const listItem = getByRole('listbox').querySelector('li');
    expect(listItem.textContent).toBe('São Paulo, Brazil');
    userEvent.click(listItem);

    await waitFor(() => expect(onSelectMock).toHaveBeenCalledWith(mockData[0]));
  });
});
