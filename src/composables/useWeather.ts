import { computed, ref } from "vue";
import { getCurrentWeather, getForecast } from "@/api";
import type { CurrentWeather } from "@/types/weather";
import type { ForecastResponse } from "@/types/forecast";
import type { GeoCity } from "@/types/geo";
import { useI18n } from "@/composables/useI18n";

export const useWeather = () => {
  const currentWeather = ref<CurrentWeather | null>(null);
  const forecast = ref<ForecastResponse | null>(null);
  const isLoading = ref(false);
  const errorKey = ref<number | null | undefined>(undefined);
  const selectedCity = ref<GeoCity | null>(null);

  const { tError } = useI18n();

  const error = computed(() =>
    errorKey.value !== undefined ? tError(errorKey.value) : null,
  );

  const load = async (city: GeoCity, lang: string) => {
    selectedCity.value = city;
    isLoading.value = true;
    errorKey.value = undefined;

    try {
      const [weather, forecastData] = await Promise.all([
        getCurrentWeather(city.lat, city.lon, lang),
        getForecast(city.lat, city.lon, lang),
      ]);

      currentWeather.value = weather;
      forecast.value = forecastData;
    } catch (err) {
      errorKey.value = typeof err === "number" ? err : null;
      currentWeather.value = null;
      forecast.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    currentWeather.value = null;
    forecast.value = null;
    errorKey.value = undefined;
  };

  return {
    currentWeather,
    forecast,
    isLoading,
    error,
    selectedCity,
    load,
    reset,
  };
};
