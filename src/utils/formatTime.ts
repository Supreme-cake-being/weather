import { localeMap } from "@/constants/localeMap";

export const formatTime = (unix: number, lang: string): string =>
  new Date(unix * 1000).toLocaleTimeString(localeMap[lang] ?? "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
