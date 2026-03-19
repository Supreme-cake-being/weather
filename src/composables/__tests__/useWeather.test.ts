import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWeather } from "@/composables/useWeather";
import type { GeoCity } from "@/types/geo";

// Mock API module
vi.mock("@/api", () => ({
  getCurrentWeather: vi.fn(),
  getForecast: vi.fn(),
}));

import { getCurrentWeather, getForecast } from "@/api";

const mockCity: GeoCity = {
  name: "Kyiv",
  country: "UA",
  lat: 50.45,
  lon: 30.52,
};

const mockWeather = {
  name: "Kyiv",
  sys: { country: "UA", sunrise: 0, sunset: 0 },
  main: { temp: 10, feels_like: 8, humidity: 60, pressure: 1013 },
  weather: [{ id: 800, description: "clear", icon: "01d", main: "Clear" }],
  wind: { speed: 3, deg: 180 },
  clouds: { all: 0 },
  coord: { lat: 50.45, lon: 30.52 },
  visibility: 10000,
  dt: 0,
  timezone: 7200,
  id: 0,
  cod: 200,
  base: "stations",
};

const mockForecast = {
  list: [],
  city: {
    id: 0,
    name: "Kyiv",
    coord: { lat: 50.45, lon: 30.52 },
    country: "UA",
    population: 0,
    timezone: 7200,
    sunrise: 0,
    sunset: 0,
  },
};

describe("useWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Initial state is empty", () => {
    const { currentWeather, forecast, isLoading, error } = useWeather();
    expect(currentWeather.value).toBeNull();
    expect(forecast.value).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it("load loads weather successfully", async () => {
    vi.mocked(getCurrentWeather).mockResolvedValue(mockWeather as never);
    vi.mocked(getForecast).mockResolvedValue(mockForecast as never);

    const { load, currentWeather, forecast, isLoading } = useWeather();

    const promise = load(mockCity, "en");
    expect(isLoading.value).toBe(true);

    await promise;
    expect(isLoading.value).toBe(false);
    expect(currentWeather.value).toEqual(mockWeather);
    expect(forecast.value).toEqual(mockForecast);
  });

  it("load sets error when status is a number", async () => {
    vi.mocked(getCurrentWeather).mockRejectedValue(404);
    vi.mocked(getForecast).mockRejectedValue(404);

    const { load, error } = useWeather();
    await load(mockCity, "en");

    expect(error.value).toBeTruthy();
    expect(error.value).not.toBeNull();
  });

  it("load sets network error when status is null", async () => {
    vi.mocked(getCurrentWeather).mockRejectedValue(null);
    vi.mocked(getForecast).mockRejectedValue(null);

    const { load, error } = useWeather();
    await load(mockCity, "en");

    expect(error.value).toBeTruthy();
  });

  it("load saves selectedCity", async () => {
    vi.mocked(getCurrentWeather).mockResolvedValue(mockWeather as never);
    vi.mocked(getForecast).mockResolvedValue(mockForecast as never);

    const { load, selectedCity } = useWeather();
    await load(mockCity, "en");

    expect(selectedCity.value).toEqual(mockCity);
  });

  it("reset clears all data", async () => {
    vi.mocked(getCurrentWeather).mockResolvedValue(mockWeather as never);
    vi.mocked(getForecast).mockResolvedValue(mockForecast as never);

    const { load, reset, currentWeather, forecast, error } = useWeather();
    await load(mockCity, "en");
    reset();

    expect(currentWeather.value).toBeNull();
    expect(forecast.value).toBeNull();
    expect(error.value).toBeNull();
  });
});
