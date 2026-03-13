// src/constants/translations.ts
export const translations = {
  uk: {
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

    // Loader
    loading: "Завантаження...",

    // AppHeader
    home: "Головна",
    favorites: "Вибране",
  },
  en: {
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

    // Loader
    loading: "Loading...",

    // AppHeader
    home: "Home",
    favorites: "Favorites",
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
