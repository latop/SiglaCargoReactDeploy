import {
  WiDaySunny, WiNightClear, WiDayHaze, WiNightCloudyGusts, WiCloudy, WiNightAltCloudy, 
  WiShowers, WiNightAltShowers, WiStormShowers, WiNightAltStormShowers, WiDaySleetStorm,
  WiNightAltSleetStorm, WiDaySnow, WiNightAltSnow, WiRain, WiNightAltRain, WiRainWind, 
  WiNightAltRainWind, WiSleet, WiNightAltSleet, WiSnow, WiSnowWind, WiSprinkle,
  WiNightAltSnowWind, WiFog, WiNightFog, WiDayRainMix, WiSnowflakeCold,
} from "react-icons/wi";

export const getWeatherCodes = (id: number, isDay: boolean) => [
  { id: 0, name: 'clearSky', title: 'Céu limpo', icon: isDay ? WiDaySunny : WiNightClear },
  { id: 1, name: 'clearSky', title: 'Céu limpo', icon: isDay ? WiDaySunny : WiNightClear },
  { id: 2, name: 'fair', title: 'Tempo justo', icon: isDay ? WiDayHaze : WiNightCloudyGusts },
  { id: 3, name: 'partlyCloudy', title: 'Parcialmente nublado', icon: isDay ? WiCloudy : WiNightAltCloudy },
  { id: 4, name: 'cloudy', title: 'Nublado', icon: isDay ? WiCloudy : WiNightAltCloudy },
  { id: 5, name: 'rainShowers', title: 'Chuvas', icon: isDay ? WiShowers : WiNightAltShowers },
  { id: 6, name: 'rainShowersAndThunder', title: 'Chuvas e trovões', icon: isDay ? WiStormShowers : WiNightAltStormShowers },
  { id: 7, name: 'sleetShowers', title: 'Granizo', icon: isDay ? WiDaySleetStorm : WiNightAltSleetStorm },
  { id: 8, name: 'snowShowers', title: 'Neve', icon: isDay ? WiDaySnow : WiNightAltSnow },
  { id: 9, name: 'rain', title: 'Chuva', icon: isDay ? WiRain : WiNightAltRain },
  { id: 10, name: 'heavyRain', title: 'Chuva forte', icon: isDay ? WiRainWind : WiNightAltRainWind },
  { id: 11, name: 'heavyRainAndThunder', title: 'Chuva forte e trovões', icon: isDay ? WiStormShowers : WiNightAltStormShowers },
  { id: 12, name: 'sleet', title: 'Granizo', icon: isDay ? WiSleet : WiNightAltSleet },
  { id: 13, name: 'snow', title: 'Neve', icon: isDay ? WiSnow : WiNightAltSnow },
  { id: 14, name: 'snowAndThunder', title: 'Neve e trovões', icon: isDay ? WiSnowWind : WiNightAltSnowWind },
  { id: 15, name: 'fog', title: 'Nevoeiro', icon: isDay ? WiFog : WiNightFog },
  { id: 20, name: 'sleetShowersAndThunder', title: 'Chuva de granizo e trovões', icon: WiDaySleetStorm },
  { id: 21, name: 'snowShowersAndThunder', title: 'Nevascas e trovões', icon: WiSnowWind },
  { id: 22, name: 'rainAndThunder', title: 'Chuva e trovões', icon: WiStormShowers },
  { id: 23, name: 'sleetAndThunder', title: 'Granizo e trovões', icon: WiDaySleetStorm },
  { id: 24, name: 'lightRainShowersAndThunder', title: 'Chuvas leves e trovões', icon: WiDayRainMix },
  { id: 25, name: 'heavyRainShowersAndThunder', title: 'Chuvas fortes e trovões', icon: WiStormShowers },
  { id: 26, name: 'lightSleetShowersAndThunder', title: 'Granizo leve e trovões', icon: WiDaySleetStorm },
  { id: 27, name: 'heavySleetShowersAndThunder', title: 'Granizo forte e trovões', icon: WiDaySleetStorm },
  { id: 28, name: 'lightSnowShowersAndThunder', title: 'Neve leve e trovões', icon: WiSnowWind },
  { id: 29, name: 'heavySnowShowersAndThunder', title: 'Neve forte e trovões', icon: WiSnowWind },
  { id: 30, name: 'lightRainAndThunder', title: 'Chuva leve e trovões', icon: WiDayRainMix },
  { id: 31, name: 'lightSleetAndThunder', title: 'Granizo leve e trovões', icon: WiDaySleetStorm },
  { id: 32, name: 'heavySleetAndThunder', title: 'Granizo forte e trovões', icon: WiDaySleetStorm },
  { id: 33, name: 'lightSnowAndThunder', title: 'Neve leve e trovões', icon: WiSnowWind },
  { id: 34, name: 'heavySnowAndThunder', title: 'Neve forte e trovões', icon: WiSnowWind },
  { id: 40, name: 'lightRainShowers', title: 'Chuvas leves', icon: WiShowers },
  { id: 41, name: 'heavyRainShowers', title: 'Chuvas fortes', icon: WiRainWind },
  { id: 42, name: 'lightSleetShowers', title: 'Chuva de granizo leve', icon: WiDaySleetStorm },
  { id: 43, name: 'heavySleetShowers', title: 'Chuva de granizo forte', icon: WiDaySleetStorm },
  { id: 44, name: 'lightSnowShowers', title: 'Nevascas leves', icon: WiDaySnow },
  { id: 45, name: 'heavySnowShowers', title: 'Nevascas fortes', icon: WiSnow },
  { id: 46, name: 'lightRain', title: 'Chuva leve', icon: WiSprinkle },
  { id: 47, name: 'lightSleet', title: 'Granizo leve', icon: WiSleet },
  { id: 48, name: 'heavySleet', title: 'Granizo forte', icon: WiSleet },
  { id: 49, name: 'lightSnow', title: 'Neve leve', icon: WiSnowflakeCold },
  { id: 50, name: 'heavySnow', title: 'Neve forte', icon: WiSnow },
  { id: 80, name: 'lightRainShowersAndThunder', title: 'Chuvas leves e trovões', icon: WiDayRainMix },
  { id: 96, name: 'rainAndThunder', title: 'Chuva e trovões', icon: WiStormShowers },
].find(item => item.id === id);

export function formatTime(dateString: string | null): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 3);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
