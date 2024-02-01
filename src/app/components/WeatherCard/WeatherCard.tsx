'use client'

import React from "react";
import Box from "@mui/material/Box";
import { CardContainer, CardContentContainer, FlexContainer, Temperature, Subtitle, IconContainer } from './WeatherCard.styles';
import Typography from "@mui/material/Typography";
import { WiStrongWind } from "react-icons/wi";
import { CircularProgress } from "@mui/material";

interface WeatherCardProps {
  children: React.ReactNode;
}

interface CityNameProps {
  children: React.ReactNode;
}

interface WeatherTimeProps {
  children: React.ReactNode;
}

interface TemperatureDisplayProps {
  temperature: string;
  description?: string;
}

interface WindSpeedProps {
  children: React.ReactNode;
}

interface WeatherIconProps {
  icon: React.ElementType;
}

export function WeatherCard({ children }: WeatherCardProps) {
  return (
    <CardContainer>
      <CardContentContainer>
        {children}
      </CardContentContainer>
    </CardContainer>
  );
}

function CityName({ children }: CityNameProps) {
  return (
    <Typography variant="h6">{children}</Typography>
  )
}

function WeatherTime({ children }: WeatherTimeProps) {
  return (
    <Typography variant="h6">{children}</Typography>
  )
}

function TemperatureDisplay({ temperature, description }: TemperatureDisplayProps) {
  return (
    <Box>
      <Temperature variant="h2">{temperature}</Temperature>
      {description && <Subtitle variant="subtitle1">{description}</Subtitle>}
    </Box>
  )
};

function WindSpeed({ children }: WindSpeedProps) {
  return (
    <IconContainer>
      <WiStrongWind size={30} />
      <Typography variant="h6">{children}</Typography>
    </IconContainer>
  );
}

function WeatherIcon({ icon: Icon }: WeatherIconProps) {
  return (
    <IconContainer>
      <Icon size={100} />
    </IconContainer>
  )
}

WeatherCard.CityName = CityName;
WeatherCard.Time = WeatherTime;
WeatherCard.Temperature = TemperatureDisplay;
WeatherCard.WindSpeed = WindSpeed;
WeatherCard.Icon = WeatherIcon;
WeatherCard.Container = FlexContainer;
WeatherCard.Loading = CircularProgress;
