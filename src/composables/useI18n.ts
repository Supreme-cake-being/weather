import { translations } from "@/constants/translations";
import { ref, computed } from "vue";

type Lang = "uk" | "en";

const lang = ref<Lang>("uk");

export const useI18n = () => {
  const t = (key: string): string => {
    return translations[lang.value]?.[key] ?? key;
  };

  const setLang = (newLang: Lang) => {
    lang.value = newLang;
  };

  return { lang: computed(() => lang.value), t, setLang };
};
