import type { ForecastItem } from "@/types/forecast";
import type { ChartPoint } from "@/types/chart";

export const getForecastForToday = (list: ForecastItem[]): ForecastItem[] => {
  const now = Math.floor(Date.now() / 1000);
  const in24h = now + 24 * 60 * 60;
  return list.filter((item) => item.dt >= now && item.dt <= in24h);
};

export const getForecastForWeek = (list: ForecastItem[]): ForecastItem[] => {
  // Group by date, using the entry closest to 12:00 PM as the day's representative
  const byDate = new Map<string, ForecastItem>();

  for (const item of list) {
    const date = item.dt_txt.slice(0, 10);
    const existing = byDate.get(date);

    if (!existing) {
      byDate.set(date, item);
      continue;
    }

    // Compare how close the current item is to 12:00 PM
    const targetHour = 12;
    const itemHour = new Date(item.dt * 1000).getHours();
    const existingHour = new Date(existing.dt * 1000).getHours();

    if (Math.abs(itemHour - targetHour) < Math.abs(existingHour - targetHour)) {
      byDate.set(date, item);
    }
  }

  return Array.from(byDate.values());
};

export const forecastToChartPoints = (
  items: ForecastItem[],
  timeFormat: "time" | "date" = "time",
): ChartPoint[] => {
  return items.map((item) => ({
    time:
      timeFormat === "date"
        ? new Date(item.dt * 1000).toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
          })
        : new Date(item.dt * 1000).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          }),
    temp: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
  }));
};
