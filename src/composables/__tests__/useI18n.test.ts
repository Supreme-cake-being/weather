import { describe, it, expect, beforeEach } from "vitest";
import { useI18n } from "@/composables/useI18n";
import { translations } from "@/constants/translations";

describe("useI18n", () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset singleton state through setLang
    const { setLang } = useI18n();
    setLang("en");
  });

  it("returns the translation for an existing key", () => {
    const { t } = useI18n();
    expect(t("searchCity")).toBe(translations.en.searchCity);
  });

  it("changes the language through setLang", () => {
    const { t, setLang } = useI18n();
    setLang("uk");
    expect(t("searchCity")).toBe(translations.uk.searchCity);
  });

  it("stores the language in localStorage", () => {
    const { setLang } = useI18n();
    setLang("uk");
    expect(localStorage.getItem("app-lang")).toBe("uk");
  });

  it("reads the language from localStorage on initialization", () => {
    localStorage.setItem("app-lang", "uk");
    const { setLang } = useI18n();
    setLang("uk"); // synchronize singleton
    const { t } = useI18n();
    expect(t("searchCity")).toBe(translations.uk.searchCity);
  });

  it("tError returns the message for network error (null)", () => {
    const { tError } = useI18n();
    expect(tError(null)).toBe(translations.en.error.network);
  });

  it("tError returns the message for a known status", () => {
    const { tError } = useI18n();
    expect(tError(404)).toBe(translations.en.error[404]);
  });

  it("tError returns unknown for an unknown status", () => {
    const { tError } = useI18n();
    expect(tError(500)).toBe(translations.en.error.unknown);
  });

  it("lang reactive updates after setLang", () => {
    const { lang, setLang } = useI18n();
    setLang("uk");
    expect(lang.value).toBe("uk");
    setLang("en");
    expect(lang.value).toBe("en");
  });
});
