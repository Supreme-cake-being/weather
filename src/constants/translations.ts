// src/constants/translations.ts
export const translations = {
  uk: {
    ok: "OK",

    // CitySearch
    searchCity: "Пошук міста",
    noResults: "Нічого не знайдено",

    // WeatherCard
    feelsLike: "Відчувається як",
    humidity: "Вологість",
    wind: "Вітер",
    pressure: "Тиск",
    sunrise: "Схід",
    sunset: "Захід",

    // WeatherBlock
    day: "День",
    fiveDays: "5 днів",

    // HomeView
    addCity: "+ Додати місто",
    deleteBlockMessage: "Ви впевнені що хочете видалити цей блок?",
    delete: "Видалити",
    cancel: "Скасувати",

    // FavoritesView
    addToFavorites: "Додати до вибраного",
    removeFromFavorites: "Видалити з вибраного",
    favoritesEmpty: "Немає вибраних міст",
    favoritesLimitMessage:
      "Для додавання видаліть місто з вибраного. Максимум 5 міст.",

    // Loader
    loading: "Завантаження...",

    // AppHeader
    home: "Головна",
    favorites: "Обране",
  },
  en: {
    ok: "OK",

    // CitySearch
    searchCity: "Search city",
    noResults: "No results",

    // WeatherCard
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    sunrise: "Sunrise",
    sunset: "Sunset",

    // WeatherBlock
    day: "Day",
    fiveDays: "5 days",

    // HomeView
    addCity: "+ Add city",
    deleteBlockMessage: "Are you sure you want to delete this block?",
    delete: "Delete",
    cancel: "Cancel",

    // FavoritesView
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    favoritesEmpty: "No favorite cities yet",
    favoritesLimitMessage:
      "To add a new city, please remove one from favorites. Maximum 5 allowed.",

    // Loader
    loading: "Loading...",

    // AppHeader
    home: "Home",
    favorites: "Favorites",
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
