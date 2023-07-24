'use client'

import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getWeatherCodes, formatTime } from '@/utils';
import { IconType } from "react-icons";
import { WiStrongWind } from "react-icons/wi";
import * as styles from "./WeatherCard.styles";

interface WeatherCardProps {
  weatherId: number;
  cityName: string;
  temperature: number;
  speed: number;
  time: string;
  isDay: boolean;
}

interface WeatherInfo {
  id: number;
  name: string;
  title: string;
  icon: IconType;
}

export default function WeatherCard({ weatherId, isDay, cityName, temperature, speed, time }: WeatherCardProps) {
  const weatherInfo: WeatherInfo | undefined = useMemo(() => {
    return getWeatherCodes(weatherId, isDay);
  }, [weatherId, isDay]);

  const Icon = weatherInfo?.icon;
  
  return (
    <Card sx={styles.cardStyles}>
      <CardContent>
        <Box sx={styles.flexContainerStyles}>
          <Typography variant="h6">
            {cityName}
          </Typography>
          <Typography variant="h6">
            {formatTime(time)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h2" sx={styles.temperatureStyles}>
            {temperature}°C
          </Typography>
          <Typography variant="subtitle1" sx={styles.subtitleStyles}>
            {weatherInfo?.title}
          </Typography>
        </Box>
        <Box sx={styles.flexContainerStyles}>
          <Box sx={styles.iconContainerStyles}>
            <WiStrongWind size={30} />
            <Typography variant="subtitle2">
              {speed}km/h
            </Typography>
          </Box>
          <Box sx={styles.iconContainerStyles}>
            {Icon && <Icon size={100} />}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
