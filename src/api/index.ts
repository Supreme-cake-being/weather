import type { ForecastResponse } from "@/types/forecast";
import type { GeoCity } from "@/types/geo";
import type { CurrentWeather } from "@/types/weather";
import axios, { type AxiosInstance } from "axios";

const ERROR_MESSAGES: Record<number, string> = {
  400: "Bad Request",
  401: "Invalid API key",
  403: "Forbidden",
  404: "City not found",
  429: "Too many requests",
};

// Interceptor for error handling
const applyInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const message = ERROR_MESSAGES[status] ?? "Something went wrong";
      return Promise.reject(new Error(message));
    },
  );
  return instance;
};

const weatherApi = applyInterceptors(
  axios.create({
    baseURL: import.meta.env.VITE_WEATHER_API_URL,
    params: {
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      units: "metric",
    },
  }),
);

const geoApi = applyInterceptors(
  axios.create({
    baseURL: import.meta.env.VITE_GEO_API_URL,
    params: {
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    },
  }),
);

export const searchCities = async (
  query: string,
  limit = 5,
): Promise<GeoCity[]> => {
  const { data } = await geoApi.get<GeoCity[]>("/direct", {
    params: { q: query, limit },
  });
  return data;
};

export const getCurrentWeather = async (
  lat: number,
  lon: number,
  lang: string,
): Promise<CurrentWeather> => {
  const { data } = await weatherApi.get<CurrentWeather>("/weather", {
    params: { lat, lon, lang },
  });
  return data;
};

export const getForecast = async (
  lat: number,
  lon: number,
  lang: string,
): Promise<ForecastResponse> => {
  const { data } = await weatherApi.get<ForecastResponse>("/forecast", {
    params: { lat, lon, lang },
  });
  return data;
};
