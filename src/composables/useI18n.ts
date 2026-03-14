import { ref, computed } from "vue";
import {
  translations,
  type Lang,
  type TranslationKey,
} from "@/constants/translations";
import { STORAGE_KEYS } from "@/constants/storageKeys";

// Helper to determine the user's language on initial load
const getInitialLang = (): Lang => {
  const saved = localStorage.getItem(STORAGE_KEYS.LANG);
  if (saved === "uk" || saved === "en") return saved;

  // Use browser language as a fallback
  const browser = navigator.language.slice(0, 2);
  return browser === "uk" ? "uk" : "en";
};

//  Explicit singleton - intentionally shared across all hook calls
//  by defining it outside the useI18n function scope.
const lang = ref<Lang>(getInitialLang());

export const useI18n = () => {
  // Translation function to get the string for a specific key
  const t = (key: TranslationKey): string => {
    return translations[lang.value][key];
  };

  // Updates the global language state and persists it to local storage
  const setLang = (newLang: Lang) => {
    lang.value = newLang;
    localStorage.setItem(STORAGE_KEYS.LANG, newLang);
  };

  return {
    lang: computed(() => lang.value),
    t,
    setLang,
  };
};
