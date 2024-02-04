import {
  WiDaySunny,
  WiNightClear,
  WiDayHaze,
  WiNightCloudyGusts,
  WiCloudy,
  WiNightAltCloudy,
  WiShowers,
  WiNightAltShowers,
  WiStormShowers,
  WiNightAltStormShowers,
  WiDaySleetStorm,
  WiNightAltSleetStorm,
  WiDaySnow,
  WiNightAltSnow,
  WiRain,
  WiNightAltRain,
  WiRainWind,
  WiNightAltRainWind,
  WiSleet,
  WiNightAltSleet,
  WiSnow,
  WiSnowWind,
  WiSprinkle,
  WiNightAltSnowWind,
  WiFog,
  WiNightFog,
  WiDayRainMix,
  WiSnowflakeCold,
} from "react-icons/wi";

export const getWeatherCodes = (id: number, isDay: boolean) => {
  const weatherCodes = {
    '0': {
      name: "clearSky",
      title: "Céu limpo",
      icon: isDay ? WiDaySunny : WiNightClear,
    },
    '1': {
      name: "clearSky",
      title: "Céu limpo",
      icon: isDay ? WiDaySunny : WiNightClear,
    },
    '2': {
      name: "fair",
      title: "Tempo justo",
      icon: isDay ? WiDayHaze : WiNightCloudyGusts,
    },
    '3': {
      name: "partlyCloudy",
      title: "Parcialmente nublado",
      icon: isDay ? WiCloudy : WiNightAltCloudy,
    },
    '4': {
      name: "cloudy",
      title: "Nublado",
      icon: isDay ? WiCloudy : WiNightAltCloudy,
    },
    '5': {
      name: "rainShowers",
      title: "Chuvas",
      icon: isDay ? WiShowers : WiNightAltShowers,
    },
    '6': {
      name: "rainShowersAndThunder",
      title: "Chuvas e trovões",
      icon: isDay ? WiStormShowers : WiNightAltStormShowers,
    },
    '7': {
      name: "sleetShowers",
      title: "Granizo",
      icon: isDay ? WiDaySleetStorm : WiNightAltSleetStorm,
    },
    '8': {
      name: "snowShowers",
      title: "Neve",
      icon: isDay ? WiDaySnow : WiNightAltSnow,
    },
    '9': {
      name: "rain",
      title: "Chuva",
      icon: isDay ? WiRain : WiNightAltRain,
    },
    '10': {
      name: "heavyRain",
      title: "Chuva forte",
      icon: isDay ? WiRainWind : WiNightAltRainWind,
    },
    '11': {
      name: "heavyRainAndThunder",
      title: "Chuva forte e trovões",
      icon: isDay ? WiStormShowers : WiNightAltStormShowers,
    },
    '12': {
      name: "sleet",
      title: "Granizo",
      icon: isDay ? WiSleet : WiNightAltSleet,
    },
    '13': {
      name: "snow",
      title: "Neve",
      icon: isDay ? WiSnow : WiNightAltSnow,
    },
    '14': {
      name: "snowAndThunder",
      title: "Neve e trovões",
      icon: isDay ? WiSnowWind : WiNightAltSnowWind,
    },
    '15': {
      name: "fog",
      title: "Nevoeiro",
      icon: isDay ? WiFog : WiNightFog,
    },
    '20': {
      name: "sleetShowersAndThunder",
      title: "Chuva de granizo e trovões",
      icon: WiDaySleetStorm,
    },
    '21': {
      name: "snowShowersAndThunder",
      title: "Nevascas e trovões",
      icon: WiSnowWind,
    },
    '22': {
      name: "rainAndThunder",
      title: "Chuva e trovões",
      icon: WiStormShowers,
    },
    '23': {
      name: "sleetAndThunder",
      title: "Granizo e trovões",
      icon: WiDaySleetStorm,
    },
    '24': {
      name: "lightRainShowersAndThunder",
      title: "Chuvas leves e trovões",
      icon: WiDayRainMix,
    },
    '25': {
      name: "heavyRainShowersAndThunder",
      title: "Chuvas fortes e trovões",
      icon: WiStormShowers,
    },
    '26': {
      name: "lightSleetShowersAndThunder",
      title: "Granizo leve e trovões",
      icon: WiDaySleetStorm,
    },
    '27': {
      name: "heavySleetShowersAndThunder",
      title: "Granizo forte e trovões",
      icon: WiDaySleetStorm,
    },
    '28': {
      name: "lightSnowShowersAndThunder",
      title: "Neve leve e trovões",
      icon: WiSnowWind,
    },
    '29': {
      name: "heavySnowShowersAndThunder",
      title: "Neve forte e trovões",
      icon: WiSnowWind,
    },
    '30': {
      name: "lightRainAndThunder",
      title: "Chuva leve e trovões",
      icon: WiDayRainMix,
    },
    '31': {
      name: "lightSleetAndThunder",
      title: "Granizo leve e trovões",
      icon: WiDaySleetStorm,
    },
    '32': {
      name: "heavySleetAndThunder",
      title: "Granizo forte e trovões",
      icon: WiDaySleetStorm,
    },
    '33': {
      name: "lightSnowAndThunder",
      title: "Neve leve e trovões",
      icon: WiSnowWind,
    },
    '34': {
      name: "heavySnowAndThunder",
      title: "Neve forte e trovões",
      icon: WiSnowWind,
    },
    '40': {
      name: "lightRainShowers",
      title: "Chuvas leves",
      icon: WiShowers,
    },
    '41': {
      name: "heavyRainShowers",
      title: "Chuvas fortes",
      icon: WiRainWind,
    },
    '42': {
      name: "lightSleetShowers",
      title: "Chuva de granizo leve",
      icon: WiDaySleetStorm,
    },
    '43': {
      name: "heavySleetShowers",
      title: "Chuva de granizo forte",
      icon: WiDaySleetStorm,
    },
    '44': {
      name: "lightSnowShowers",
      title: "Nevascas leves",
      icon: WiDaySnow,
    },
    '45': {
      name: "heavySnowShowers",
      title: "Nevascas fortes",
      icon: WiSnow,
    },
    '46': {
      name: "lightRain",
      title: "Chuva leve",
      icon: WiSprinkle,
    },
    '47': {
      name: "lightSleet",
      title: "Granizo leve",
      icon: WiSleet,
    },
    '48': {
      name: "heavySleet",
      title: "Granizo forte",
      icon: WiSleet,
    },
    '49': {
      name: "lightSnow",
      title: "Neve leve",
      icon: WiSnowflakeCold,
    },
    '50': {
      name: "heavySnow",
      title: "Neve forte",
      icon: WiSnow,
    },
    '80': {
      name: "lightRainShowersAndThunder",
      title: "Chuvas leves e trovões",
      icon: WiDayRainMix,
    },
    '95': {
      name: "rainShowers",
      title: "Chuvas",
      icon: isDay ? WiShowers : WiNightAltShowers,
    },
    '96': {
      name: "rainAndThunder",
      title: "Chuva e trovões",
      icon: WiStormShowers,
    },
    '97': {
      name: "sleetShowers",
      title: "Granizo",
      icon: isDay ? WiDaySleetStorm : WiNightAltSleetStorm,
    },
    '98': {
      name: "snowShowers",
      title: "Neve",
      icon: isDay ? WiDaySnow : WiNightAltSnow,
    },
    '99': {
      name: "rain",
      title: "Chuva",
      icon: isDay ? WiRain : WiNightAltRain,
    },
  };
  
  return weatherCodes[id.toString() as keyof typeof weatherCodes];
}

  export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 3);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
