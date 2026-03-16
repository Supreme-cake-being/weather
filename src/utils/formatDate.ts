import { localeMap } from "@/constants/localeMap";

export const formatDate = (lang: string): string =>
  new Date().toLocaleDateString(localeMap[lang] ?? "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const formatDateShort = (date: number, lang: string): string =>
  new Date(date * 1000).toLocaleDateString(localeMap[lang] ?? "en-US", {
    weekday: "short",
    day: "numeric",
  });
