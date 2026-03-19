import { describe, it, expect, beforeEach } from "vitest";
import { useTheme } from "@/composables/useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    // Reset singleton to light
    const { theme } = useTheme();
    theme.value = "light";
  });

  it("toggleTheme switches from light to dark", () => {
    const { theme, toggleTheme } = useTheme();
    theme.value = "light";
    toggleTheme();
    expect(theme.value).toBe("dark");
  });

  it("toggleTheme switches from dark to light", () => {
    const { theme, toggleTheme } = useTheme();
    theme.value = "dark";
    toggleTheme();
    expect(theme.value).toBe("light");
  });

  it("applyTheme adds the dark class to the html element when the theme is dark", async () => {
    const { theme } = useTheme();
    theme.value = "dark";
    await Promise.resolve();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applyTheme removes the dark class from the html element when the theme is light", async () => {
    const { theme } = useTheme();
    theme.value = "dark";
    await Promise.resolve();
    theme.value = "light";
    await Promise.resolve();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("stores the theme in localStorage", async () => {
    const { theme } = useTheme();
    theme.value = "dark";
    await Promise.resolve();
    expect(localStorage.getItem("app-theme")).toBe("dark");
  });
});
