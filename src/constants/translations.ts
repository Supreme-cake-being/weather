export const translations = {
  uk: {
    searchCity: "Пошук міста",
    noResults: "Нічого не знайдено",
    feelsLike: "Відчувається як",
    humidity: "Вологість",
    wind: "Вітер",
    pressure: "Тиск",
    sunrise: "Схід",
    sunset: "Захід",
  },
  en: {
    searchCity: "Search city",
    noResults: "No results",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    sunrise: "Sunrise",
    sunset: "Sunset",
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
