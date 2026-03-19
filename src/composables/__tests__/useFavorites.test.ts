import { describe, it, expect, beforeEach } from "vitest";
import { useFavorites } from "@/composables/useFavorites";
import type { GeoCity } from "@/types/geo";

const mockCity = (lat: number, lon: number): GeoCity => ({
  name: `City_${lat}`,
  country: "UA",
  lat,
  lon,
});

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset singleton state
    const { favorites } = useFavorites();
    favorites.value = [];
  });

  it("initially favorites is empty", () => {
    const { favorites } = useFavorites();
    expect(favorites.value).toHaveLength(0);
  });

  it("add new city", () => {
    const { add, favorites } = useFavorites();
    const city = mockCity(1, 1);
    const result = add(city);
    expect(result).toBe(true);
    expect(favorites.value).toHaveLength(1);
  });

  it("add not adds duplicates", () => {
    const { add, favorites } = useFavorites();
    const city = mockCity(1, 1);
    add(city);
    add(city);
    expect(favorites.value).toHaveLength(1);
  });

  it("add returns false when limit is exceeded", () => {
    const { add, MAX_FAVORITES } = useFavorites();
    for (let i = 0; i < MAX_FAVORITES; i++) {
      add(mockCity(i, i));
    }
    const result = add(mockCity(99, 99));
    expect(result).toBe(false);
  });

  it("remove removes a city", () => {
    const { add, remove, favorites } = useFavorites();
    const city = mockCity(1, 1);
    add(city);
    remove(city);
    expect(favorites.value).toHaveLength(0);
  });

  it("isFavorite returns true for a added city", () => {
    const { add, isFavorite } = useFavorites();
    const city = mockCity(1, 1);
    add(city);
    expect(isFavorite(city)).toBe(true);
  });

  it("isFavorite returns false for a not added city", () => {
    const { isFavorite } = useFavorites();
    expect(isFavorite(mockCity(99, 99))).toBe(false);
  });

  it("toggle adds a city if it's not already added", () => {
    const { toggle, favorites } = useFavorites();
    const city = mockCity(1, 1);
    const result = toggle(city);
    expect(result).toBe(true);
    expect(favorites.value).toHaveLength(1);
  });

  it("toggle removes a city if it's already added", () => {
    const { add, toggle, favorites } = useFavorites();
    const city = mockCity(1, 1);
    add(city);
    const result = toggle(city);
    expect(result).toBe(false);
    expect(favorites.value).toHaveLength(0);
  });

  it("toggle returns false when limit is exceeded", () => {
    const { add, toggle, MAX_FAVORITES } = useFavorites();
    for (let i = 0; i < MAX_FAVORITES; i++) {
      add(mockCity(i, i));
    }
    const result = toggle(mockCity(99, 99));
    expect(result).toBe(false);
  });
});
