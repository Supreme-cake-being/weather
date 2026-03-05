import { ref } from "vue";
import { getCurrentWeather, getForecast } from "@/api";
import type { CurrentWeather } from "@/types/weather";
import type { ForecastResponse } from "@/types/forecast";

export const useWeather = () => {
  const currentWeather = ref<CurrentWeather | null>(null);
  const forecast = ref<ForecastResponse | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchWeather = async (lat: number, lon: number, lang: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon, lang),
        getForecast(lat, lon, lang),
      ]);

      currentWeather.value = weatherData;
      forecast.value = forecastData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Something went wrong";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    currentWeather,
    forecast,
    isLoading,
    error,
    fetchWeather,
  };
};
