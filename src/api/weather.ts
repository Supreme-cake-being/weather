import type { ForecastResponse } from "@/types/forecast";
import type { CurrentWeather } from "@/types/weather";
import { weatherClient } from "./client";

export const getCurrentWeather = async (
  lat: number,
  lon: number,
  lang: string,
): Promise<CurrentWeather> => {
  const { data } = await weatherClient.get<CurrentWeather>("/weather", {
    params: { lat, lon, lang },
  });
  return data;
};

export const getForecast = async (
  lat: number,
  lon: number,
  lang: string,
): Promise<ForecastResponse> => {
  const { data } = await weatherClient.get<ForecastResponse>("/forecast", {
    params: { lat, lon, lang },
  });
  return data;
};
