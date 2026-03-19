import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getWeatherTheme } from "@/utils/weatherTheme";

// Fixed timestamps for testing
const NOON = Math.floor(new Date("2024-01-01T12:00:00").getTime() / 1000);
const SUNRISE = Math.floor(new Date("2024-01-01T06:00:00").getTime() / 1000);
const SUNSET = Math.floor(new Date("2024-01-01T18:00:00").getTime() / 1000);
const NIGHT = Math.floor(new Date("2024-01-01T23:00:00").getTime() / 1000);

describe("getWeatherTheme", () => {
  beforeEach(() => {
    // By default — day (12:00)
    vi.spyOn(Date, "now").mockReturnValue(NOON * 1000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the night theme when it's nighttime", () => {
    // Mock Date.now() to return a time during the night
    vi.spyOn(Date, "now").mockReturnValue(NIGHT * 1000);
    const theme = getWeatherTheme(800, SUNRISE, SUNSET);
    expect(theme.gradient).toContain("#0f0c29");
    expect(theme.textColor).toBe("#ffffff");
  });

  it("returns the thunderstorm theme for weatherId 200-299", () => {
    expect(getWeatherTheme(200, SUNRISE, SUNSET).gradient).toContain("#1a1a2e");
    expect(getWeatherTheme(299, SUNRISE, SUNSET).gradient).toContain("#1a1a2e");
  });

  it("returns the rain theme for weatherId 300-599", () => {
    expect(getWeatherTheme(300, SUNRISE, SUNSET).gradient).toContain("#2c3e50");
    expect(getWeatherTheme(500, SUNRISE, SUNSET).gradient).toContain("#2c3e50");
  });

  it("returns the snow theme for weatherId 600-699", () => {
    const theme = getWeatherTheme(600, SUNRISE, SUNSET);
    expect(theme.gradient).toContain("#e8eaf6");
    expect(theme.textColor).toBe("#1a237e");
  });

  it("returns the clear sky theme for weatherId 800", () => {
    const theme = getWeatherTheme(800, SUNRISE, SUNSET);
    expect(theme.gradient).toContain("#2980b9");
  });

  it("returns the fallback theme for unknown weatherId", () => {
    const theme = getWeatherTheme(999, SUNRISE, SUNSET);
    expect(theme.gradient).toContain("#2980b9");
    expect(theme.textColor).toBe("#ffffff");
  });

  it("returns the atmosphere theme for weatherId 700-799", () => {
    const theme = getWeatherTheme(700, SUNRISE, SUNSET);
    expect(theme.gradient).toContain("#757f9a");
    expect(theme.textColor).toBe("#1c1c2e");
  });

  it("returns the few clouds theme for weatherId 801-802", () => {
    const theme801 = getWeatherTheme(801, SUNRISE, SUNSET);
    expect(theme801.gradient).toContain("#4b6cb7");
    expect(theme801.textColor).toBe("#ffffff");

    const theme802 = getWeatherTheme(802, SUNRISE, SUNSET);
    expect(theme802.gradient).toContain("#4b6cb7");
  });

  it("returns the overcast theme for weatherId 803-804", () => {
    const theme803 = getWeatherTheme(803, SUNRISE, SUNSET);
    expect(theme803.gradient).toContain("#606c88");
    expect(theme803.textColor).toBe("#ffffff");

    const theme804 = getWeatherTheme(804, SUNRISE, SUNSET);
    expect(theme804.gradient).toContain("#606c88");
  });
});
