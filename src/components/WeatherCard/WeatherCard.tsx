import React from "react";
import Box from "@mui/material/Box";
import { red, grey } from "@mui/material/colors";
import {
  CardContainer,
  Header,
  UpdateContainer,
  CardContentContainer,
  Footer,
  IconContainer,
} from "./WeatherCard.styles";
import Typography from "@mui/material/Typography";
import { WiStrongWind } from "react-icons/wi";
import { IoMdTime } from "react-icons/io";
import { CircularProgress } from "@mui/material";
import { GiWindsock } from "react-icons/gi";
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
  windSpeed: string;
  windDirection: string;
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
        <Box gap="10px" data-testid="card-error">
          <MdOutlineError color={red[500]} size={60} />
          <Typography variant="body1" color={grey[500]}>
            Não foi possível buscar os dados meteorológicos
          </Typography>
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
  return <Typography variant="h6" fontWeight={400}>{children}</Typography>;
}

function TemperatureDisplay({
  temperature,
  description,
}: TemperatureDisplayProps) {
  return (
    <Box marginTop="40px" marginBottom="40px">
      <Typography variant="h2">{temperature}</Typography>
      {description && (
        <Typography variant="subtitle1" color={grey[500]}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

function WeatherInfo({ windSpeed, windDirection }: WindSpeedProps) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box display="flex" gap="5px">
        <WiStrongWind size={20} color={grey[800]} />
        <Typography variant="body1">{windSpeed}</Typography>
      </Box>
      <Box display="flex" gap="5px">
        <GiWindsock size={20} color={grey[800]} />
        <Typography variant="body1">{windDirection}</Typography>
      </Box>
    </Box>
  );
}

function WeatherIcon({ icon: Icon }: WeatherIconProps) {
  return (
    <IconContainer>
      <Icon color={grey[800]} size={100} />
    </IconContainer>
  );
}

function WeatherUpdate({ onClick, isUpdating }: WeatherUpdateProps) {
  return (
    <UpdateContainer isUpdating={isUpdating} onClick={onClick}>
      <RxUpdate size={24}  color={grey[800]} />
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
