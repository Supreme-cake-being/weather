import { ref, watch } from "vue";
import { STORAGE_KEYS } from "@/constants/storageKeys";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === "light" || saved === "dark") return saved;

  // Default to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

// Singleton
const theme = ref<Theme>(getInitialTheme());

// Apply theme on initial load
applyTheme(theme.value);

watch(theme, (val) => {
  applyTheme(val);
  localStorage.setItem(STORAGE_KEYS.THEME, val);
});

export const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  return { theme, toggleTheme };
};
