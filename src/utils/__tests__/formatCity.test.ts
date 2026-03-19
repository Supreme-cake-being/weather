import { describe, it, expect } from "vitest";
import { formatCityLabel } from "@/utils/formatCity";
import type { GeoCity } from "@/types/geo";

const makeCity = (overrides: Partial<GeoCity> = {}): GeoCity => ({
  name: "Kyiv",
  country: "UA",
  lat: 50.45,
  lon: 30.52,
  ...overrides,
});

describe("formatCityLabel", () => {
  it("returns the city name and country without a state", () => {
    const city = makeCity();
    expect(formatCityLabel(city)).toBe("Kyiv, UA");
  });

  it("includes the state if it exists", () => {
    const city = makeCity({ state: "Kyiv Oblast" });
    expect(formatCityLabel(city)).toBe("Kyiv, Kyiv Oblast, UA");
  });

  it("does not include the state if it is undefined", () => {
    const city = makeCity({ state: undefined });
    expect(formatCityLabel(city)).toBe("Kyiv, UA");
  });

  it("correctly formats a city with a different country", () => {
    const city = makeCity({ name: "Berlin", country: "DE" });
    expect(formatCityLabel(city)).toBe("Berlin, DE");
  });
});
