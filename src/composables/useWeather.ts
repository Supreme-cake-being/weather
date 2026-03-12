import { ref } from "vue";
import { getCurrentWeather, getForecast } from "@/api";
import type { CurrentWeather } from "@/types/weather";
import type { ForecastResponse } from "@/types/forecast";
import type { GeoCity } from "@/types/geo";

export const useWeather = () => {
  const currentWeather = ref<CurrentWeather | null>(null);
  const forecast = ref<ForecastResponse | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const load = async (city: GeoCity, lang: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const [weather, forecastData] = await Promise.all([
        getCurrentWeather(city.lat, city.lon, lang),
        getForecast(city.lat, city.lon, lang),
      ]);

      currentWeather.value = weather;
      forecast.value = forecastData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Something went wrong";
      currentWeather.value = null;
      forecast.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    currentWeather.value = null;
    forecast.value = null;
    error.value = null;
  };

  return { currentWeather, forecast, isLoading, error, load, reset };
};
