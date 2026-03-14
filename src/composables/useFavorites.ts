import { ref, watch } from "vue";
import type { GeoCity } from "@/types/geo";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const MAX_FAVORITES = 5;

const readFromStorage = (): GeoCity[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? (JSON.parse(raw) as GeoCity[]) : [];
  } catch {
    return [];
  }
};

// Singleton
const favorites = ref<GeoCity[]>(readFromStorage());

watch(
  favorites,
  (val) => localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(val)),
  { deep: true },
);

export const useFavorites = () => {
  const isFavorite = (city: GeoCity): boolean =>
    favorites.value.some((f) => f.lat === city.lat && f.lon === city.lon);

  const add = (city: GeoCity): boolean => {
    if (favorites.value.length >= MAX_FAVORITES) return false;
    if (isFavorite(city)) return true;
    favorites.value.push(city);
    return true;
  };

  const remove = (city: GeoCity) => {
    favorites.value = favorites.value.filter(
      (f) => !(f.lat === city.lat && f.lon === city.lon),
    );
  };

  const toggle = (city: GeoCity): boolean => {
    if (isFavorite(city)) {
      remove(city);
      return false;
    }
    return add(city);
  };

  return {
    favorites,
    isFavorite,
    add,
    remove,
    toggle,
    MAX_FAVORITES,
  };
};
