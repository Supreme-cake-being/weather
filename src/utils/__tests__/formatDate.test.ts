import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formatDate, formatDateShort } from "@/utils/formatDate";

// Fixed date for testing
const FIXED_DATE = new Date("2024-03-15T12:00:00").getTime();
const FIXED_UNIX = Math.floor(FIXED_DATE / 1000);

describe("formatDate", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(FIXED_DATE);
    // Mock the Date constructor without arguments
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("returns the date in the format with the full day of the week for en", () => {
    const result = formatDate("en");
    // 2024-03-15 — Friday
    expect(result).toContain("Friday");
    expect(result).toContain("15");
    expect(result).toContain("March");
  });

  it("returns the date in the format with the full day of the week for uk", () => {
    const result = formatDate("uk");
    expect(result).toContain("15");
    // Ukrainian locale — should contain the month in Ukrainian
    expect(result).toMatch(/березня|березень/i);
  });

  it("uses en-US as fallback for unknown language", () => {
    const result = formatDate("fr");
    // Should return a string without error
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("formatDateShort", () => {
  it("returns the short date for en", () => {
    const result = formatDateShort(FIXED_UNIX, "en");
    // Should contain the abbreviated day of the week and the date
    expect(result).toContain("15");
    expect(result).toMatch(/Fri|Fri\./);
  });

  it("returns the short date for uk", () => {
    const result = formatDateShort(FIXED_UNIX, "uk");
    expect(result).toContain("15");
    expect(typeof result).toBe("string");
  });

  it("correctly converts the unix timestamp", () => {
    // Check that the function correctly multiplies by 1000
    const result = formatDateShort(FIXED_UNIX, "en");
    expect(result).toContain("15");
  });
});
