import { computed } from "vue";
import type { Ref } from "vue";
import type { ForecastResponse } from "@/types/forecast";
import type { ChartPoint } from "@/types/chart";

const getWeatherEmoji = (id: number): string => {
  if (id >= 200 && id < 300) return "⛈️";
  if (id >= 300 && id < 400) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id === 801) return "🌤️";
  if (id === 802) return "⛅";
  if (id >= 803) return "☁️";
  return "🌡️";
};

export const useForecastChart = (forecast: Ref<ForecastResponse | null>) => {
  const todayPoints = computed<ChartPoint[]>(() => {
    if (!forecast.value) return [];

    const now = new Date();
    const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return forecast.value.list
      .filter((item) => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate >= now && itemDate <= in24h;
      })
      .map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        weatherId: item.weather[0]?.id ?? 800,
        icon: getWeatherEmoji(item.weather[0]?.id ?? 800),
      }));
  });

  return { todayPoints };
};
