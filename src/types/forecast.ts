import type {
  WeatherClouds,
  WeatherCondition,
  WeatherCoord,
  WeatherMain,
  WeatherRain,
  WeatherSnow,
  WeatherWind,
} from "./weather";

export interface ForecastItem {
  dt: number;
  main: WeatherMain;
  weather: WeatherCondition[];
  clouds: WeatherClouds;
  wind: WeatherWind;
  visibility: number;
  rain?: WeatherRain;
  snow?: WeatherSnow;
  dt_txt: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: WeatherCoord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
