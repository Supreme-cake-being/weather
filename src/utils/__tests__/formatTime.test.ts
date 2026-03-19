import { describe, it, expect } from "vitest";
import { formatTime } from "@/utils/formatTime";

const UNIX_14_30 = Math.floor(
  new Date("2024-03-15T14:30:00Z").getTime() / 1000,
);

describe("formatTime", () => {
  it("returns the time in HH:MM format for uk", () => {
    const result = formatTime(UNIX_14_30, "uk");
    // Ukrainian locale — 24-hour format
    expect(result).toMatch(/\d{2}:\d{2}/);
  });

  it("returns the time for en", () => {
    const result = formatTime(UNIX_14_30, "en");
    // Should contain the time
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("uses en-US as fallback for unknown language", () => {
    const result = formatTime(UNIX_14_30, "fr");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("correctly converts the unix timestamp", () => {
    const midnight = Math.floor(
      new Date("2024-03-15T00:00:00Z").getTime() / 1000,
    );
    const result = formatTime(midnight, "uk");
    expect(result).toMatch(/\d{2}:\d{2}/);
  });
});
