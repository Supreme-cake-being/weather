import axios, { type AxiosInstance } from "axios";

const ERROR_MESSAGES: Record<number, string> = {
  400: "Bad Request",
  401: "Invalid API key",
  403: "Forbidden",
  404: "City not found",
  429: "Too many requests",
};

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

export const weatherClient = applyInterceptors(
  axios.create({
    baseURL: import.meta.env.VITE_WEATHER_API_URL,
    params: {
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      units: "metric",
    },
  }),
);

export const geoClient = applyInterceptors(
  axios.create({
    baseURL: import.meta.env.VITE_GEO_API_URL,
    params: {
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    },
  }),
);
