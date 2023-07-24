'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { WeatherCard, CitySearch } from '@/components';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Função chamada quando uma cidade é selecionada na busca
  const handleCitySelect = city => {
    setSelectedCity(city);
  };

  // Quando a cidade selecionada mudar, busque os dados do tempo
  useEffect(() => {
    if (selectedCity && selectedCity.lat && selectedCity.lon) {
      axios.get(`api/weather/data?lat=${selectedCity.lat}&long=${selectedCity.lon}`)
        .then(res => {
          const data = res.data;
          setWeatherData({
            weatherId: data.weathercode,
            cityName: selectedCity.name.split(',')[0],
            temperature: data.temperature,
            speed: data.windspeed,
            time: data.time,
            isDay: Boolean(data.is_day),
          });
        });
    }
  }, [selectedCity]);

  return (
    <main className={styles.main}>
      <CitySearch onSelect={handleCitySelect} />
      {weatherData && <WeatherCard {...weatherData} />}
    </main>
  );
}
