import React from "react";
import Box from "@mui/material/Box";
import { red, grey } from '@mui/material/colors';
import {
  CardContainer,
  Header,
  UpdateContainer,
  CardContentContainer,
  Footer,
  Temperature,
  Subtitle,
  IconContainer,
} from "./WeatherCard.styles";
import Typography from "@mui/material/Typography";
import { WiStrongWind } from "react-icons/wi";
import { IoMdTime } from "react-icons/io";
import { CircularProgress } from "@mui/material";
import { MdOutlineError } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

interface WeatherCardProps {
  children: React.ReactNode;
  loading: boolean;
  error: boolean;
}

interface CityNameProps {
  children: React.ReactNode;
}

interface TemperatureDisplayProps {
  temperature: string;
  description?: string;
}

interface WindSpeedProps {
  time: string;
  windSpeed: string;
}

interface WeatherIconProps {
  icon: React.ElementType;
}

interface WeatherUpdateProps {
  onClick: () => void;
  isUpdating: boolean;
}

export function WeatherCard({ children, loading, error }: WeatherCardProps) {
  return (
    <CardContainer>
      {loading && <CircularProgress data-testid="card-loading" />}
      {error && (
        <Box gap="10px">
          <MdOutlineError color={red[500]} size={60} data-testid="card-error" />
          <Typography variant="body1" color={grey[500]}>Não foi possível buscar os dados meteorológicos</Typography>
        </Box>
      )}
      {!loading && !error && (
        <CardContentContainer data-testid="card-container">
          {children}
        </CardContentContainer>
      )}
    </CardContainer>
  );
}

function CityName({ children }: CityNameProps) {
  return <Typography variant="h6">{children}</Typography>;
}

function TemperatureDisplay({
  temperature,
  description,
}: TemperatureDisplayProps) {
  return (
    <Box>
      <Temperature variant="h2">{temperature}</Temperature>
      {description && <Subtitle variant="subtitle1">{description}</Subtitle>}
    </Box>
  );
}

function WeatherInfo({ time, windSpeed }: WindSpeedProps) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box display="flex">
        <IconContainer>
          <WiStrongWind size={30} />
          <Typography variant="h6">{windSpeed}</Typography>
        </IconContainer>
      </Box>
      <Box display="flex" gap="5px">
        <IoMdTime size={30} />
        <Typography variant="h6">{time}</Typography>
      </Box>
    </Box>
  );
}

function WeatherIcon({ icon: Icon }: WeatherIconProps) {
  return (
    <IconContainer>
      <Icon size={100} />
    </IconContainer>
  );
}

function WeatherUpdate({ onClick, isUpdating }: WeatherUpdateProps) {
  return (
    <UpdateContainer isUpdating={isUpdating} onClick={onClick}>
      <RxUpdate size={24} />
    </UpdateContainer>
  );
}

WeatherCard.CityName = CityName;
WeatherCard.Temperature = TemperatureDisplay;
WeatherCard.WeatherInfo = WeatherInfo;
WeatherCard.Icon = WeatherIcon;
WeatherCard.Footer = Footer;
WeatherCard.WeatherUpdate = WeatherUpdate;
WeatherCard.Header = Header;
