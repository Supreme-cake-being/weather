import { describe, it, expect, vi, beforeEach } from "vitest";
import { useGeolocation } from "@/composables/useGeolocation";

describe("useGeolocation", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns GeoCity when API responds successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            city: "Odesa",
            country_code: "UA",
            region: "Odesa Oblast",
            latitude: 46.48,
            longitude: 30.72,
            error: false,
          }),
      }),
    );

    const { detectCity } = useGeolocation();
    const result = await detectCity();

    expect(result).toEqual({
      name: "Odesa",
      country: "UA",
      state: "Odesa Oblast",
      lat: 46.48,
      lon: 30.72,
    });
  });

  it("returns null if API returns error: true", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ error: true }),
      }),
    );

    const { detectCity } = useGeolocation();
    const result = await detectCity();

    expect(result).toBeNull();
  });

  it("returns null on network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    const { detectCity } = useGeolocation();
    const result = await detectCity();

    expect(result).toBeNull();
  });
});
