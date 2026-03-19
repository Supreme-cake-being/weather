import { describe, it, expect } from "vitest";
import {
  getForecastForToday,
  getForecastForWeek,
  forecastToChartPoints,
} from "@/utils/forecastHelpers";
import type { ForecastItem } from "@/types/forecast";

const makeItem = (hoursFromNow: number): ForecastItem => {
  const dt = Math.floor(Date.now() / 1000) + hoursFromNow * 3600;
  const date = new Date(dt * 1000);
  return {
    dt,
    dt_txt: date.toISOString().replace("T", " ").slice(0, 19),
    main: {
      temp: 10,
      feels_like: 8,
      temp_min: 8,
      temp_max: 12,
      pressure: 1013,
      humidity: 60,
    },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    clouds: { all: 0 },
    wind: { speed: 3, deg: 180 },
    visibility: 10000,
    pop: 0,
  };
};

describe("getForecastForToday", () => {
  it("returns only records within the next 24 hours", () => {
    const list = [
      makeItem(-1), // previous hour — do not include
      makeItem(0), // now — include
      makeItem(12), // in 12 hours — include
      makeItem(24), // exactly 24 hours — include
      makeItem(25), // more than 24 hours — do not include
    ];

    const result = getForecastForToday(list);
    expect(result).toHaveLength(3);
  });

  it("returns an empty array if there are no records", () => {
    expect(getForecastForToday([])).toHaveLength(0);
  });
});

describe("getForecastForWeek", () => {
  it("returns one record per day", () => {
    const list = [
      makeItem(2), // today
      makeItem(5), // today
      makeItem(26), // tomorrow
      makeItem(29), // tomorrow
      makeItem(50), // the day after tomorrow
    ];

    const result = getForecastForWeek(list);
    // Number of unique dates should match the length of the result
    const dates = new Set(result.map((i) => i.dt_txt.slice(0, 10)));
    expect(result).toHaveLength(dates.size);
  });

  it("returns the record closest to 12:00", () => {
    const now = new Date();
    now.setHours(10, 0, 0, 0);
    const item10 = { ...makeItem(0), dt: Math.floor(now.getTime() / 1000) };
    now.setHours(13, 0, 0, 0);
    const item13 = { ...makeItem(0), dt: Math.floor(now.getTime() / 1000) };

    const result = getForecastForWeek([item10, item13]);
    // item13 is closer to 12:00
    expect(result[0]?.dt).toBe(item13.dt);
  });
});

describe("forecastToChartPoints", () => {
  it("returns an array of ChartPoint with correct properties", () => {
    const list = [makeItem(1), makeItem(4)];
    const result = forecastToChartPoints(list, "time", "en");

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("time");
    expect(result[0]).toHaveProperty("temp");
    expect(result[0]).toHaveProperty("feelsLike");
    expect(result[0]?.temp).toBe(10);
    expect(result[0]?.feelsLike).toBe(8);
  });

  it("formats the time correctly for the date mode", () => {
    const list = [makeItem(1)];
    const result = forecastToChartPoints(list, "date", "en");
    expect(result[0]?.time).toMatch(/\w+/);
  });
});
